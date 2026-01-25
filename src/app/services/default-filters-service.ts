import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DefaultFiltersService {
  // filtrar por tipo de norma - filterByLawType
  filterByLawType(items: any[], type: string): any[] {
    if (!type) return items;

    const normalize = (value: string) =>
      value
        .toLowerCase()
        .normalize('NFD')
        .replaceAll(/[\u0300-\u036f]/g, '');

    const normalizedType = normalize(type);

    return items.filter(item => {
      const title = item?.titulo;
      if (!title) return false;

      const normalizedTitle = normalize(title);

      // excepción Real Decreto-Ley
      if (
        normalizedType === 'real decreto' &&
        normalizedTitle.startsWith('real decreto-ley')
      ) {
        return true;
      }

      return (
        normalizedTitle.startsWith(normalizedType + ' ') ||
        normalizedTitle === normalizedType
      );
    });
  }

  // obtener órgano/ministerio únicos: 
  // sirve para enumerarlos en el select
  filterByMinistries(items: any[]): string[] {
    const ministries = items
      .map(item => item?.ministerio)
      .filter(Boolean)
      .map(m => m.trim());

    return Array.from(new Set(ministries));
  }

  // fitrar por ministerio
  filterByMinistry(items: any[], ministry: string): any[] {
    if (!ministry) return items;

    const normalized = ministry.trim().toLowerCase();

    return items.filter(item =>
      item?.ministerio?.trim().toLowerCase() === normalized
    );
  }

  // filtrar todos
  applyAllFilters(
    items: any[],
    ministry?: string,
    lawType?: string
  ): any[] {
    let filtered = items;

    if (ministry) {
      filtered = this.filterByMinistry(filtered, ministry);
    }

    if (lawType) {
      filtered = this.filterByLawType(filtered, lawType);
    }

    return filtered;
  }
}