import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DefaultFiltersService } from '../../services/default-filters-service';
import { BoeService } from '../../services/boe-service';

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
    private readonly filtersService: DefaultFiltersService
  ) { }

  // BUSCAR PROBLEMAS
  // ngOnInit(): void {
  //   const today = new Date();
  //   const date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  //   this.boeService.getSumario(date).subscribe(data => {
  //     console.log('SUMARIO RAW', data);
  //     this.sumario = data;
  //   });
  // }

  ngOnInit(): void {
    const today = new Date();
    const date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

    this.boeService.getSumario(date).subscribe(data => {
      this.sumario = data;
      this.ministries = this.filtersService.filterByMinistries(this.sumario);

      // console.log('SUMARIO RAW', data);
      // console.log('Ministries loaded:', this.ministries);
    });

  }

  // Función para aplicar el filtro de tipo de norma
  applyTypeLawFilter() {
    if (!this.sumario || !this.selectedLawType) return;

    this.filteredResults = this.filtersService.filterByLawType(
      this.sumario,
      this.selectedLawType
    );
  }

  // Función para limpiar el filtro de tipo de norma
  clearLawTypeFilter() {
    this.selectedLawType = '';
    this.applyAllFilters();
  }

  // Función para aplicar el filtro de ministerio
  applyMinistryFilter() {
    if (!this.sumario || !this.selectedMinistry) return;

    this.filteredResults = this.filtersService.filterByMinistry(
      this.sumario,
      this.selectedMinistry
    );
  }

  // Función para limpiar el filtro de ministerio
  clearMinistryFilter() {
    this.selectedMinistry = '';
    this.applyAllFilters();
  }

  // Función para cargar el sumario por fecha
  loadSummaryByDate() {
    if (!this.selectedDate) return;

    const formattedDate = this.selectedDate.replaceAll('-', '');

    this.boeService.getSumario(formattedDate).subscribe(data => {
      this.sumario = data;

      this.ministries = this.filtersService.filterByMinistries(this.sumario);

      this.applyAllFilters();
    });
  }

  // Función para aplicar todos los filtros
  applyAllFilters() {
    if (!this.sumario) return;

    this.filteredResults = this.filtersService.applyAllFilters(
      this.sumario,
      this.selectedMinistry,
      this.selectedLawType
    );
  }

  // Función para limpiar todos los filtros
  clearAllFilters() {
    this.selectedLawType = '';
    this.selectedMinistry = '';
    this.filteredResults = [];
  }
}
