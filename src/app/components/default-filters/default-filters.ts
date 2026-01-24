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

  // relacioando co el filtro de tipo de norma
  selectedLawType = '';

  // relacioando co el filtro de ministerio
  ministries: string[] = [];
  selectedMinistry = '';

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
    const date = '20260115'; // fecha provisional

    this.boeService.getSumario(date).subscribe(data => {
      // console.log('SUMARIO RAW', data);
      this.sumario = data;

      this.ministries = this.filtersService.filterByMinistries(this.sumario);
      console.log('Ministries loaded:', this.ministries);
    });

  }

  // prueba
  showEpigraphs(): void {
    if (!this.sumario) return;
    this.filtersService.extractEpigraphs(this.sumario);
  }

  // prueba
  showItems() {
    if (!this.sumario) return;
    this.filtersService.extractItems(this.sumario);
  }

  // Función para aplicar el filtro de tipo de norma
  applyTypeLawFilter() {
    if (!this.sumario || !this.selectedLawType) return;

    const laws = this.filtersService.filterByLawType(
      this.sumario,
      this.selectedLawType
    );

    console.log('Filtered laws:', laws);
  }

  // Función para aplicar el filtro de ministerio
  applyMinistryFilter() {
    if (!this.sumario) return;

    const filtered = this.filtersService.filterByMinistry(this.sumario, this.selectedMinistry);
    console.log('Filtered by ministry:', filtered);
  }

}
