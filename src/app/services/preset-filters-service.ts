import { Injectable } from '@angular/core';

export interface PresetFilter {
  id: string;
  label: string;
  value: string;
  type?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PresetFiltersService {
  constructor() { }

  getNormTypeFilters(): PresetFilter[] {
    return [
      { id: 'ley', label: 'Leyes', value: 'Ley', type: 'normType', icon: 'gavel' },
      { id: 'real-decreto', label: 'Reales Decretos', value: 'Real Decreto', type: 'normType', icon: 'balance' },
      { id: 'orden-ministerial', label: 'Órdenes Ministeriales', value: 'Orden Ministerial', type: 'normType', icon: 'description' },
      { id: 'resolucion', label: 'Resoluciones', value: 'Resolución', type: 'normType', icon: 'assignment' },
      { id: 'acuerdo', label: 'Acuerdos', value: 'Acuerdo', type: 'normType', icon: 'handshake' },
      { id: 'circular', label: 'Circulares', value: 'Circular', type: 'normType', icon: 'repeat' }
    ];
  }

  // Filtros predefinidos por ministerios/organismos comunes
  getMinistryFilters(): PresetFilter[] {
    return [
      { id: 'hacienda', label: 'Hacienda', value: 'Ministerio de Hacienda', type: 'ministry', icon: 'euro_symbol' },
      { id: 'justicia', label: 'Justicia', value: 'Ministerio de Justicia', type: 'ministry', icon: 'gavel' },
      { id: 'educacion', label: 'Educación', value: 'Ministerio de Educación', type: 'ministry', icon: 'school' },
      { id: 'sanidad', label: 'Sanidad', value: 'Ministerio de Sanidad', type: 'ministry', icon: 'medical_services' },
      { id: 'interior', label: 'Interior', value: 'Ministerio del Interior', type: 'ministry', icon: 'security' },
      { id: 'defensa', label: 'Defensa', value: 'Ministerio de Defensa', type: 'ministry', icon: 'military_tech' },
      { id: 'funcionarios', label: 'Funcionarios', value: 'Consejo de Ministros', type: 'ministry', icon: 'groups' }
    ];
  }

  // Filtros predefinidos por secciones del BOE
  getSectionFilters(): PresetFilter[] {
    return [
      { id: 'disposiciones', label: 'Disposiciones Generales', value: 'I.', type: 'section', icon: 'article' },
      { id: 'personal', label: 'Autoridades y Personal', value: 'II.', type: 'section', icon: 'person' },
      { id: 'hacienda', label: 'Economía y Hacienda', value: 'III.', type: 'section', icon: 'attach_money' },
      { id: 'universidades', label: 'Universidades', value: 'IV-A.', type: 'section', icon: 'school' },
      { id: 'seguridad', label: 'Seguridad Social', value: 'V.', type: 'section', icon: 'health_and_safety' }
    ];
  }

  // Filtros predefinidos por áreas temáticas (para opositores)
  getThematicFilters(): PresetFilter[] {
    return [
      { id: 'oposiciones', label: 'Oposiciones', value: 'oposición|concurso|plaza|empleo público', type: 'theme', icon: 'assignment_turned_in' },
      { id: 'funcionarios', label: 'Funcionarios', value: 'cuerpo|escalas|funcionario|carrera', type: 'theme', icon: 'badge' },
      { id: 'fiscal', label: 'Fiscal/Tributario', value: 'tribut|impuesto|iva|hacienda', type: 'theme', icon: 'account_balance' },
      { id: 'educacion', label: 'Educación', value: 'educación|enseñanza|universidad|alumno', type: 'theme', icon: 'menu_book' },
      { id: 'sanidad', label: 'Sanidad', value: 'sanidad|salud|farmacia|médico', type: 'theme', icon: 'local_hospital' },
      { id: 'justicia', label: 'Justicia', value: 'judicial|proceso|penal|civil', type: 'theme', icon: 'balance' }
    ];
  }

  // Filtros predefinidos por frecuencia (para notificaciones)
  getFrequencyFilters(): PresetFilter[] {
    return [
      { id: 'diario', label: 'Diario', value: 'daily', type: 'frequency', icon: 'today' },
      { id: 'semanal', label: 'Semanal', value: 'weekly', type: 'frequency', icon: 'date_range' },
      { id: 'oposiciones', label: 'Solo Oposiciones', value: 'competitions', type: 'frequency', icon: 'notifications_active' },
      { id: 'leyes', label: 'Solo Leyes', value: 'laws', type: 'frequency', icon: 'gavel' }
    ];
  }

  // Obtener todos los filtros organizados por categoría
  getAllPresetFilters(): { [key: string]: PresetFilter[] } {
    return {
      normTypes: this.getNormTypeFilters(),
      ministries: this.getMinistryFilters(),
      sections: this.getSectionFilters(),
      themes: this.getThematicFilters(),
      frequencies: this.getFrequencyFilters()
    };
  }

  // Obtener filtros agrupados para mostrar en la UI
  getGroupedFilters(): { title: string; filters: PresetFilter[] }[] {
    return [
      { title: 'Tipo de Norma', filters: this.getNormTypeFilters() },
      { title: 'Ministerios', filters: this.getMinistryFilters() },
      { title: 'Secciones BOE', filters: this.getSectionFilters() },
      { title: 'Áreas Temáticas', filters: this.getThematicFilters() }
    ];
  }

  // Buscar filtros predefinidos por término
  searchPresetFilters(searchTerm: string): PresetFilter[] {
    const allFilters = this.getAllPresetFilters();
    const results: PresetFilter[] = [];

    Object.values(allFilters).forEach(category => {
      category.forEach(filter => {
        if (filter.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          filter.value.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(filter);
        }
      });
    });

    return results;
  }

  // Validar si un filtro es válido
  isValidFilter(type: string, value: string): boolean {
    const filtersMap: { [key: string]: PresetFilter[] } = {
      'normType': this.getNormTypeFilters(),
      'ministry': this.getMinistryFilters(),
      'section': this.getSectionFilters(),
      'theme': this.getThematicFilters(),
      'frequency': this.getFrequencyFilters()
    };

    const categoryFilters = filtersMap[type];
    if (!categoryFilters) return false;

    return categoryFilters.some(filter =>
      filter.value.toLowerCase() === value.toLowerCase() ||
      filter.id === value
    );
  }

  // Obtener etiqueta para un valor de filtro
  getFilterLabel(type: string, value: string): string {
    const filtersMap: { [key: string]: PresetFilter[] } = {
      'normType': this.getNormTypeFilters(),
      'ministry': this.getMinistryFilters(),
      'section': this.getSectionFilters(),
      'theme': this.getThematicFilters(),
      'frequency': this.getFrequencyFilters()
    };

    const categoryFilters = filtersMap[type];
    if (!categoryFilters) return value;

    const filter = categoryFilters.find(f =>
      f.value === value || f.id === value
    );

    return filter ? filter.label : value;
  }

  // Obtener filtro completo por tipo y valor
  getFilterByTypeAndValue(type: string, value: string): PresetFilter | undefined {
    const filtersMap: { [key: string]: PresetFilter[] } = {
      'normType': this.getNormTypeFilters(),
      'ministry': this.getMinistryFilters(),
      'section': this.getSectionFilters(),
      'theme': this.getThematicFilters(),
      'frequency': this.getFrequencyFilters()
    };

    const categoryFilters = filtersMap[type];
    if (!categoryFilters) return undefined;

    return categoryFilters.find(f =>
      f.value === value || f.id === value
    );
  }

  // Convertir filtros a query params para la API
  convertFiltersToQueryParams(filters: PresetFilter[]): { [key: string]: string } {
    const params: { [key: string]: string } = {};

    filters.forEach(filter => {
      if (filter.type) {
        if (filter.type === 'theme') {
          params['keyword'] = filter.value;
        } else {
          params[filter.type] = filter.value;
        }
      }
    });
    return params;
  }

} // presetFilters.end
