import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DefaultFiltersService {
  // filtrar por tipo de norma
  filterByLawType(sumario: any[], tipo: string) {
    const resultado = sumario.filter(item => item.tipo === tipo);
    console.log('Filtrado por tipo:', tipo, resultado);
    return resultado;
  }

  // filtrar por órgano/ministerio

  // filtrar por rango de fecha (datepipe)

  // filtrar por disposición

  // ? filtrar por estado de norma
}
