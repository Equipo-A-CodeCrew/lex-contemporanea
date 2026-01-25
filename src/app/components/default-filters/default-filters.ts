import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DefaultFiltersService } from '../../services/default-filters-service';
import { BoeService } from '../../services/boe-service';
import { ExtractDataService } from '../../services/extract-data-service';

@Component({
  selector: 'app-default-filters',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './default-filters.html',
  styleUrl: './default-filters.scss',
})
export class DefaultFilters {

  sumario: any;

  items: any[] = [];

  // filteredItems: any[] = [];
  filteredResults: any[] = [];

  // relacionado con el filtro de tipo de norma
  selectedLawType = '';

  // relacionado con el filtro de ministerio
  ministries: string[] = [];
  selectedMinistry = '';

  // relacionado con el filtro por fecha
  selectedDate = '';

  constructor(
    private readonly boeService: BoeService,
    private readonly filtersService: DefaultFiltersService,
    private readonly extractDataService: ExtractDataService,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    this.loadSumario(date);

  }

  loadSumario(date: string): void {
    this.boeService.getSumario(date).subscribe(data => {
      this.sumario = data;
      this.items = this.extractDataService.extractItems(this.sumario);

      this.filteredResults = this.items;
      this.ministries = this.filtersService.filterByMinistries(this.items);
    });
  }

  // aplicar filtros individuales
  applyTypeLawFilter(): void {
    this.applyAllFilters();
  }

  applyMinistryFilter(): void {
    this.applyAllFilters();
  }

  // aplicar todos los filtros
  applyAllFilters(): void {
    this.filteredResults = this.filtersService.applyAllFilters(
      this.items,
      this.selectedMinistry,
      this.selectedLawType
    );
  }

  // limpiar filtros individuales
  clearLawTypeFilter(): void {
    this.selectedLawType = '';
    this.applyAllFilters();
  }

  clearMinistryFilter(): void {
    this.selectedMinistry = '';
    this.applyAllFilters();
  }

  // limpiar todos
  clearAllFilters(): void {
    this.selectedLawType = '';
    this.selectedMinistry = '';
    this.filteredResults = this.items;
  }

  // cambio de fecha
  loadSummaryByDate(): void {
    if (!this.selectedDate) return;

    const formattedDate = this.selectedDate.replaceAll('-', '');
    this.loadSumario(formattedDate);
  }
}
