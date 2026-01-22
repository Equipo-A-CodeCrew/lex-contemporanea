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

        epigraphList.forEach((epigraph: any) => {

          const item = epigraph?.item ?? epigraph?.Item;

          if (Array.isArray(item)) {
            items.push(...item);
          } else if (item) {
            items.push(item);
          }

        });

      });

    });

    console.log('Items:', items);
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

    return items.filter((item: any) => {
      const title = item?.titulo as string;
      if (!title) return false;

      const firstTwoWords = title.split(' ').slice(0, 2).join(' ');
      const firstWord = title.split(' ')[0];

      return firstTwoWords === type || firstWord === type;
    });
  }

  // filtrar por órgano/ministerio

  // filtrar por rango de fecha (datepipe)

  // filtrar por disposición

  // ? filtrar por estado de norma
}
