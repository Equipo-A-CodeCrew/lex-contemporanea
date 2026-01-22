import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface BOEItem {
  id: string;
  titulo: string;
  tipo: string;
  departamento: string;
  fechaPublicacion: string;
  fechaVigor: string;
  seccion: string;
  enlaces: {
    pdf: string;
    html: string;
    xml: string;
  };
  numero: string;
  seccionNumero: string;
}

export interface BOESummaryResponse {
  fecha: string;
  items: BOEItem[];
  total: number;
}

export interface SearchParams {
  fecha?: string | Date;
  tipoNorma?: string;
  ministerio?: string;
  keyword?: string;
  seccion?: string;
  limit?: number;
  offset?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BoeSearchService {

  private readonly baseUrl = '/datosabiertos/api/boe/sumario';

  constructor(private readonly http: HttpClient) { }

  search(params: SearchParams): Observable<BOESummaryResponse> {
    if (params.fecha) {
      const fechaStr = this.formatDate(params.fecha);
      return this.getDailySummary(fechaStr, params);
    }

    return of({
      fecha: this.formatDate(new Date()),
      items: [],
      total: 0
    });
  }

  private getDailySummary(
    fecha: string,
    filters?: SearchParams
  ): Observable<BOESummaryResponse> {

    const fechaBoe = fecha.replace(/-/g, '');
    const url = `${this.baseUrl}/${fechaBoe}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        // DEBUG opcional
        (globalThis.window as any).__boeRawResponse = response;

        return this.transformJsonResponse(response, fecha, filters);
      }),
      catchError(error => {
        console.error('Error BOE:', error);
        return of({
          fecha,
          items: [],
          total: 0
        });
      })
    );
  }

  private asArray<T>(value: T | T[] | undefined): T[] {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }


private transformJsonResponse(
  jsonData: any,
  fecha: string,
  filters?: SearchParams
): BOESummaryResponse {

  const items: BOEItem[] = [];

  const root = jsonData?.data ?? jsonData;

  const diarios = this.asArray(root?.sumario?.diario);

  diarios.forEach((diario: any) => {

    const seccionesObj = diario?.seccion ?? {};

    Object.values(seccionesObj).forEach((seccion: any) => {

      const departamentos = this.asArray(seccion.departamento);

      departamentos.forEach((dep: any) => {

        const epigrafes = this.asArray(dep.epigrafe);

        epigrafes.forEach((epi: any) => {

          const documentos = this.asArray(epi.item);

          documentos.forEach((doc: any) => {
            items.push({
              id: doc.id,
              titulo: doc.titulo,
              tipo: this.determineTipo(doc),
              departamento: dep.nombre,
              fechaPublicacion: fecha,
              fechaVigor: '',
              seccion: seccion.nombre,
              enlaces: {
                pdf: doc.url_pdf ?? '',
                html: doc.url_html ?? '',
                xml: doc.url_xml ?? ''
              },
              numero: doc.id,
              seccionNumero: ''
            });
          });

        });
      });
    });
  });

  console.log('[BOE] Items construidos:', items.length);

  const filteredItems = filters
    ? this.applyFilters(items, filters)
    : items;

  return {
    fecha,
    items: filteredItems,
    total: filteredItems.length
  };
}


  private determineTipo(doc: any): string {
    const id = doc.id ?? '';
    const titulo = doc.titulo?.toLowerCase() ?? '';

    // PRIORIDAD 1: Disposiciones generales (BOE-A)
    if (id.startsWith('BOE-A')) {
      if (titulo.includes('ley')) return 'Ley';
      if (titulo.includes('real decreto')) return 'Real Decreto';
      if (titulo.includes('orden')) return 'Orden Ministerial';
      if (titulo.includes('resolución')) return 'Resolución';
      return 'Disposición';
    }

    // PRIORIDAD 2: Otros casos
    if (titulo.includes('resolución')) return 'Resolución';
    if (titulo.includes('orden')) return 'Orden Ministerial';
    if (titulo.includes('real decreto')) return 'Real Decreto';

    return 'Otro';
  }

  private applyFilters(
    items: BOEItem[],
    filters: SearchParams
  ): BOEItem[] {

    console.log('[applyFilters] items:', items.length);
    console.log('[applyFilters] filters:', filters);

    return items.filter(item => {

      // Tipo de norma
      if (filters.tipoNorma && item.tipo !== filters.tipoNorma) {
        return false;
      }

      // Ministerio
      if (
        filters.ministerio &&
        !item.departamento
          .toLowerCase()
          .includes(filters.ministerio.toLowerCase())
      ) {
        return false;
      }

      // Palabra clave
      if (filters.keyword) {
        const keywords = filters.keyword
          .toLowerCase()
          .split(' ')
          .filter(Boolean);

        const titulo = item.titulo.toLowerCase();

        if (!keywords.some(k => titulo.includes(k))) {
          return false;
        }
      }

      // Sección
      if (filters.seccion && !item.seccion.startsWith(filters.seccion)) {
        return false;
      }

      if (filters.tipoNorma) {
        console.log(
          `[OK ${filters.tipoNorma}]`,
          item.titulo
        );
      }

      return true;
    });
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private searchInDateRange(
    params: SearchParams
  ): Observable<BOESummaryResponse> {

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const requests: Observable<BOESummaryResponse>[] = [];
    const currentDate = new Date(startDate);
    const endDate = new Date();

    while (currentDate <= endDate) {
      requests.push(
        this.getDailySummary(
          this.formatDate(currentDate),
          params
        )
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return forkJoin(requests).pipe(
      map(responses => {
        const allItems = responses.flatMap(r => r.items);
        return {
          fecha: 'Rango múltiple',
          items: allItems,
          total: allItems.length
        };
      })
    );
  }
}
