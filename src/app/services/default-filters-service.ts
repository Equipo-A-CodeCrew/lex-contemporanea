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
      section.departamento.forEach((department: any) => {
        department.epigrafe.forEach((epigraph: any) => {

          const item = epigraph.item;
          console.log('Item:', item);

          if (Array.isArray(item)) {
            item.forEach((i: any) => items.push(i));
          } else if (item) {
            items.push(item);
          }
        });
      });
    });

    return items;
  }

  extractEpigraphs(summary: any): any[] {
    const epigraphs: any[] = [];

    const daily = summary?.data?.sumario?.diario?.[0];
    if (!daily?.seccion) return epigraphs;

    daily.seccion.forEach((section: any) => {
      section.departamento.forEach((department: any) => {
        department.epigrafe.forEach((epigraph: any) => {
          console.log('Epigraph:', epigraph);
          epigraphs.push(epigraph);
        });
      });
    });

    return epigraphs;
  }

  // filtrar por tipo de norma - filterByLawType

  // filtrar por órgano/ministerio

  // filtrar por rango de fecha (datepipe)

  // filtrar por disposición

  // ? filtrar por estado de norma
}
