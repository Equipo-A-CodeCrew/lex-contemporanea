import { Component } from '@angular/core';

import { DefaultFiltersService } from '../../services/default-filters-service';
import { BoeService } from '../../services/boe-service';

@Component({
  selector: 'app-default-filters',
  imports: [],
  templateUrl: './default-filters.html',
  styleUrl: './default-filters.scss',
})
export class DefaultFilters {

  sumario: any;

  constructor(
    private readonly boeService: BoeService,
    private readonly filtersService: DefaultFiltersService
  ) { }

  // Código temporalmente comentado para mayor comodidad
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
      console.log('SUMARIO RAW', data);
      this.sumario = data;
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

  //Prueba
  applyTypeLawFilter() {
    if (!this.sumario) return;

    const laws = this.filtersService.filterByLawType(this.sumario, 'Decreto');
    console.log('Filtered laws:', laws);
  }
}
