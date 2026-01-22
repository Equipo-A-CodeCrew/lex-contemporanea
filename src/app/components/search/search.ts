import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BoeSearchService, BOESummaryResponse, SearchParams } from '../../services/boe-search';
import { PresetFiltersService, PresetFilter } from '../../services/preset-filters-service';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})

export class SearchComponent {
  searchForm: FormGroup;
  results: BOESummaryResponse | null = null;
  loading = false;
  groupedFilters: { title: string; filters: PresetFilter[] }[];
  activeFilters: PresetFilter[] = [];
  rawBoeResponse: any = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly boeService: BoeSearchService,
    private readonly presetFilters: PresetFiltersService
  ) {
    this.searchForm = this.fb.group({
      fecha: [new Date().toISOString().split('T')[0]],
      keyword: [''],
      tipoNorma: [''],
      ministerio: [''],
      seccion: ['']
    });

    this.groupedFilters = this.presetFilters.getGroupedFilters();
  }

  isFilterActive(filterId: string): boolean {
    return this.activeFilters.some(f => f.id === filterId);
  }

  onSearch(): void {
    if (this.loading) return;

    this.loading = true;
    const formValues = this.searchForm.value;

    // Combinar filtros
    const searchParams: SearchParams = {
      ...this.cleanFormValues(formValues),
      ...this.convertActiveFiltersToParams()
    };

    // Eliminar propiedades undefined
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key as keyof SearchParams] === undefined ||
        searchParams[key as keyof SearchParams] === '') {
        delete searchParams[key as keyof SearchParams];
      }
    });

    console.log('Buscando con parámetros:', searchParams);

    this.boeService.search(searchParams).subscribe({
      next: (response: any) => {
        this.results = response;
        this.loading = false;
        console.log('Resultados recibidos:', response);

        this.rawBoeResponse = (globalThis.window as any).__boeRawResponse;
      },
      error: (error: any) => {
        console.error('Error en la búsqueda:', error);
        this.loading = false;

        this.results = {
          fecha: typeof searchParams.fecha === 'string'
            ? searchParams.fecha
            : new Date().toISOString().split('T')[0],
          items: [],
          total: 0
        };
      }
    });
  }

  onPresetFilterSelected(filter: PresetFilter): void {
    // Añadir o quitar filtro
    const index = this.activeFilters.findIndex(f =>
      f.id === filter.id && f.type === filter.type
    );

    if (index === -1) {
      this.activeFilters.push(filter);
    } else {
      this.activeFilters.splice(index, 1);
    }

    // Actualizar formulario
    this.updateFormFromActiveFilters();

    this.updateFormFromActiveFilters();
    this.onSearch();
  }

  private updateFormFromActiveFilters(): void {
    const formValues: any = {};

    this.activeFilters.forEach(filter => {
      if (filter.type === 'normType') {
        formValues.tipoNorma = filter.value;
      } else if (filter.type === 'ministry') {
        formValues.ministerio = filter.value;
      } else if (filter.type === 'section') {
        formValues.seccion = filter.value;
      } else if (filter.type === 'theme') {
        formValues.keyword = filter.value.split('|')[0];
      }
    });

    this.searchForm.patchValue(formValues);
  }

  private cleanFormValues(values: any): Partial<SearchParams> {
    const clean: Partial<SearchParams> = {};

    if (values.fecha) clean.fecha = values.fecha;
    if (values.keyword?.trim()) clean.keyword = values.keyword.trim();
    if (values.tipoNorma) clean.tipoNorma = values.tipoNorma;
    if (values.ministerio) clean.ministerio = values.ministerio;
    if (values.seccion) clean.seccion = values.seccion;

    return clean;
  }

  private convertActiveFiltersToParams(): Partial<SearchParams> {
    const params: Partial<SearchParams> = {};

    this.activeFilters.forEach(filter => {
      if (filter.type === 'normType') {
        params.tipoNorma = filter.value;
      } else if (filter.type === 'ministry') {
        params.ministerio = filter.value;
      } else if (filter.type === 'section') {
        params.seccion = filter.value;
      } else if (filter.type === 'theme') {
        params.keyword = filter.value.split('|')[0];
      }
    });

    return params;
  }

  removeActiveFilter(index: number): void {
    this.activeFilters.splice(index, 1);

    // Resetear primero
    this.searchForm.patchValue({
      keyword: '',
      tipoNorma: '',
      ministerio: '',
      seccion: ''
    });

    this.updateFormFromActiveFilters();
  }


  clearAllFilters(): void {
    this.activeFilters = [];
    this.searchForm.reset({
      fecha: new Date().toISOString().split('T')[0]
    });
  }
}