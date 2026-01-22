import { Component } from '@angular/core';

import { DefaultFiltersService } from '../../services/default-filters-service';

@Component({
  selector: 'app-default-filters',
  imports: [],
  templateUrl: './default-filters.html',
  styleUrl: './default-filters.scss',
})
export class DefaultFilters {

  // Simulación del sumario
  sumarioMock = [
    { tipo: 'Ley', titulo: 'Ley X' },
    { tipo: 'Real Decreto', titulo: 'RD Y' },
    { tipo: 'Ley', titulo: 'Ley Z' }
  ];

  constructor(
    private readonly filtersService: DefaultFiltersService
  ) {}

  aplicarFiltro(): void {
    this.filtersService.filterByLawType(this.sumarioMock, 'Ley');
  }
}
