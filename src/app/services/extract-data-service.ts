import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExtractDataService {

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

    return epigraphs;
  }

  extractTitles(summary: any): string[] {
    const items = this.extractItems(summary);
    const titles: string[] = [];

    items.forEach((item: any) => {
      if (item?.titulo) titles.push(item.titulo);
    });

    return titles;
  }

}
