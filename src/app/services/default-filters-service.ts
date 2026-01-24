import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DefaultFiltersService {

  extractItems(summary: any): any[] {
    const items: any[] = [];

    const daily = summary?.data?.sumario?.diario?.[0];
    if (!daily?.seccion) return items;

    daily.seccion.forEach((section: any) => {

      const departments = Array.isArray(section.departamento)
        ? section.departamento
        : [section.departamento];

      departments.forEach((department: any) => {

        const epigraphsFromText = department?.texto?.epigrafe;
        const epigraphsDirect = department?.epigrafe;

        const epigraphList = epigraphsFromText ?? epigraphsDirect;

        if (!Array.isArray(epigraphList)) return;

        // hay que refactorizar esto: desmasiado nesting
        epigraphList.forEach((epigraph: any) => {

          const item = epigraph?.item ?? epigraph?.Item;

          if (Array.isArray(item)) {
            item.forEach((i: any) => {
              i.ministerio = department.nombre;
              items.push(i);
            });
          } else if (item) {
            item.ministerio = department.nombre;
            items.push(item);
          }

        });

      });

    });

    console.log('Items with ministry:', items);
    // console.log('Items:', items);
    return items;
  }

  extractEpigraphs(summary: any): any[] {

    const epigraphs: any[] = [];

    const daily = summary?.data?.sumario?.diario?.[0];
    if (!daily?.seccion) return epigraphs;

    daily.seccion.forEach((section: any) => {

      const departments = Array.isArray(section.departamento)
        ? section.departamento
        : [section.departamento];

      departments.forEach((department: any) => {

        // Caso A: department.texto.epigrafe
        const epigraphsFromText = department?.texto?.epigrafe;
        if (Array.isArray(epigraphsFromText)) {
          epigraphs.push(...epigraphsFromText);
        }

        // Caso B: department.epigrafe
        const epigraphsDirect = department?.epigrafe;
        if (Array.isArray(epigraphsDirect)) {
          epigraphs.push(...epigraphsDirect);
        }

      });

    });

    console.log('Epigraphs:', epigraphs);
    return epigraphs;
  }

  extractTitles(summary: any): string[] {
    const items = this.extractItems(summary);
    const titles: string[] = [];

    items.forEach((item: any) => {
      if (item?.titulo) titles.push(item.titulo);
    });

    console.log('Titles:', titles);
    return titles;
  }

  // filtrar por tipo de norma - filterByLawType
  filterByLawType(summary: any, type: string): any[] {
    const items = this.extractItems(summary);

    const validPrefixes = [
      'Ley',
      'Real Decreto',
      'Decreto',
      'Reglamento',
      'Orden',
      'Resolución',
      'Instrucción',
      'Circular',
      'Acuerdo',
      'Texto Refundido',
      'Corrección de errores'
    ];

    if (!validPrefixes.includes(type)) {
      console.warn('Invalid law type:', type);
      return [];
    }

    const normalize = (value: string) =>
      value
        .toLowerCase()
        .normalize('NFD')
        .replaceAll(/[\u0300-\u036f]/g, '');

    const normalizedType = normalize(type);

    return items.filter((item: any) => {
      const title = item?.titulo as string;
      if (!title) return false;

      const normalizedTitle = normalize(title);

      // Excepción para Real Decreto-Ley
      if (
        normalizedType === 'real decreto' &&
        normalizedTitle.startsWith('real decreto-ley')
      ) {
        return true;
      }

      return normalizedTitle.startsWith(normalizedType + ' ')
        || normalizedTitle === normalizedType;
    });
  }

  // obtener órgano/ministerio únicos: 
  // sirve para enumerarlos en el select
  filterByMinistries(summary: any): string[] {
    const items = this.extractItems(summary);

    const ministries = items
      .map((item: any) => item?.ministerio)
      .filter((m: string | undefined) => !!m)
      .map(m => m!.trim()) // normaliza espacios

    const uniqueMinistries = Array.from(new Set(ministries));

    console.log('Ministries (unique):', uniqueMinistries);

    return uniqueMinistries;
  }

  // fitrar por ministerio
  filterByMinistry(summary: any, ministry: string): any[] {
    const items = this.extractItems(summary);

    if (!ministry?.trim()) {
      return items;
    }

    const normalized = ministry.trim().toLowerCase();

    return items.filter((item: any) => {
      const m = item?.ministerio;
      return m && m.trim().toLowerCase() === normalized;
    });
  }

  // filtrar por rango de fecha (datepipe)

  // filtrar por disposición

  // ? filtrar por estado de norma
}
