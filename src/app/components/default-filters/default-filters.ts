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

  ngOnInit(): void {
    const today = new Date();
    const date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

    this.boeService.getSumario(date).subscribe(data => {
      console.log('SUMARIO RAW', data);
      this.sumario = data;
    });
  }

  showEpigraphs(): void {
    if (!this.sumario) return;
    this.filtersService.extractEpigraphs(this.sumario);
  }

  showItems() {
    if (!this.sumario) return;
    this.filtersService.extractItems(this.sumario);
  }
}
