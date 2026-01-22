import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SearchFilters {
  keyword: string;
  lawType: string;
  department: string;
  dateFrom: string;
  dateTo: string;
}

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="filters-wrapper">
      <div class="filters-header">
        <h3 class="filters-title">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"/>
          </svg>
          Filtros de búsqueda
        </h3>
        @if (hasActiveFilters()) {
          <button 
            class="btn-clear"
            (click)="clearFilters()"
          >
            Limpiar filtros
          </button>
        }
      </div>

      <div class="filters-grid">
        <!-- Búsqueda por palabra clave -->
        <div class="filter-group filter-group-wide">
          <label class="filter-label" for="keyword">
            Palabra clave
          </label>
          <div class="input-with-icon">
            <svg class="input-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            <input
              id="keyword"
              type="text"
              class="filter-input"
              [(ngModel)]="filters.keyword"
              (ngModelChange)="onFilterChange()"
              placeholder="Ej: función pública, educación..."
            />
          </div>
          <small class="filter-hint">Busca en títulos y contenido de normas</small>
        </div>

        <!-- Tipo de norma -->
        <div class="filter-group">
          <label class="filter-label" for="lawType">
            Tipo de norma
          </label>
          <select
            id="lawType"
            class="filter-select"
            [(ngModel)]="filters.lawType"
            (ngModelChange)="onFilterChange()"
          >
            <option value="">Todas</option>
            <option value="ley-organica">Ley Orgánica</option>
            <option value="real-decreto">Real Decreto</option>
            <option value="orden">Orden Ministerial</option>
            <option value="resolucion">Resolución</option>
            <option value="acuerdo">Acuerdo</option>
          </select>
        </div>

        <!-- Ministerio/Departamento -->
        <div class="filter-group">
          <label class="filter-label" for="department">
            Ministerio
          </label>
          <select
            id="department"
            class="filter-select"
            [(ngModel)]="filters.department"
            (ngModelChange)="onFilterChange()"
          >
            <option value="">Todos</option>
            <option value="hacienda">Hacienda</option>
            <option value="justicia">Justicia</option>
            <option value="educacion">Educación</option>
            <option value="trabajo">Trabajo</option>
            <option value="interior">Interior</option>
            <option value="defensa">Defensa</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <!-- Fecha desde -->
        <div class="filter-group">
          <label class="filter-label" for="dateFrom">
            Desde
          </label>
          <input
            id="dateFrom"
            type="date"
            class="filter-input"
            [(ngModel)]="filters.dateFrom"
            (ngModelChange)="onFilterChange()"
          />
        </div>

        <!-- Fecha hasta -->
        <div class="filter-group">
          <label class="filter-label" for="dateTo">
            Hasta
          </label>
          <input
            id="dateTo"
            type="date"
            class="filter-input"
            [(ngModel)]="filters.dateTo"
            (ngModelChange)="onFilterChange()"
          />
        </div>
      </div>

      <!-- Active Filters Display -->
      @if (hasActiveFilters()) {
        <div class="active-filters">
          <span class="active-filters-label">Filtros activos:</span>
          <div class="filter-tags">
            @if (filters.keyword) {
              <span class="filter-tag">
                "{{ filters.keyword }}"
                <button (click)="removeFilter('keyword')" class="filter-tag-remove">×</button>
              </span>
            }
            @if (filters.lawType) {
              <span class="filter-tag">
                {{ getLawTypeName(filters.lawType) }}
                <button (click)="removeFilter('lawType')" class="filter-tag-remove">×</button>
              </span>
            }
            @if (filters.department) {
              <span class="filter-tag">
                {{ getDepartmentName(filters.department) }}
                <button (click)="removeFilter('department')" class="filter-tag-remove">×</button>
              </span>
            }
            @if (filters.dateFrom) {
              <span class="filter-tag">
                Desde: {{ filters.dateFrom }}
                <button (click)="removeFilter('dateFrom')" class="filter-tag-remove">×</button>
              </span>
            }
            @if (filters.dateTo) {
              <span class="filter-tag">
                Hasta: {{ filters.dateTo }}
                <button (click)="removeFilter('dateTo')" class="filter-tag-remove">×</button>
              </span>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .filters-wrapper {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      animation: fadeIn 0.4s ease-out;
    }

    .filters-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-lg);
    }

    .filters-title {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: 1.125rem;
      margin: 0;
      color: var(--color-text);
    }

    .btn-clear {
      padding: var(--space-xs) var(--space-md);
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text-light);
      border-radius: var(--radius-md);
      cursor: pointer;
      font-size: 0.875rem;
      transition: all var(--transition-fast);
      
      &:hover {
        border-color: var(--color-error);
        color: var(--color-error);
      }
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-lg);
      margin-bottom: var(--space-lg);
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      
      &.filter-group-wide {
        grid-column: 1 / -1;
      }
    }

    .filter-label {
      font-weight: 500;
      font-size: 0.875rem;
      color: var(--color-text);
    }

    .input-with-icon {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: var(--space-md);
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-text-light);
      pointer-events: none;
    }

    .filter-input {
      width: 100%;
      
      &:not([type="date"]) {
        padding-left: calc(var(--space-md) + 16px + var(--space-sm));
      }
    }

    .filter-select {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text);
      font-family: var(--font-body);
      font-size: 0.9375rem;
      cursor: pointer;
      transition: all var(--transition-fast);
      
      &:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
      }
    }

    .filter-hint {
      font-size: 0.75rem;
      color: var(--color-text-light);
      margin-top: var(--space-xs);
    }

    .active-filters {
      padding-top: var(--space-lg);
      border-top: 1px solid var(--color-border);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-sm);
    }

    .active-filters-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-light);
    }

    .filter-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }

    .filter-tag {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-xs) var(--space-sm);
      background: var(--color-accent);
      color: var(--color-primary);
      font-size: 0.8125rem;
      font-weight: 500;
      border-radius: var(--radius-sm);
      animation: fadeIn 0.2s ease-out;
    }

    .filter-tag-remove {
      background: transparent;
      border: none;
      color: var(--color-primary);
      font-size: 1.25rem;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background var(--transition-fast);
      
      &:hover {
        background: rgba(26, 26, 46, 0.1);
      }
    }

    @media (max-width: 768px) {
      .filters-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SearchFiltersComponent {
  @Output() filtersChange = new EventEmitter<SearchFilters>();

  filters: SearchFilters = {
    keyword: '',
    lawType: '',
    department: '',
    dateFrom: '',
    dateTo: ''
  };

  onFilterChange(): void {
    this.filtersChange.emit(this.filters);
  }

  hasActiveFilters(): boolean {
    return !!(
      this.filters.keyword ||
      this.filters.lawType ||
      this.filters.department ||
      this.filters.dateFrom ||
      this.filters.dateTo
    );
  }

  clearFilters(): void {
    this.filters = {
      keyword: '',
      lawType: '',
      department: '',
      dateFrom: '',
      dateTo: ''
    };
    this.onFilterChange();
  }

  removeFilter(filterKey: keyof SearchFilters): void {
    this.filters[filterKey] = '';
    this.onFilterChange();
  }

  getLawTypeName(value: string): string {
    const names: Record<string, string> = {
      'ley-organica': 'Ley Orgánica',
      'real-decreto': 'Real Decreto',
      'orden': 'Orden Ministerial',
      'resolucion': 'Resolución',
      'acuerdo': 'Acuerdo'
    };
    return names[value] || value;
  }

  getDepartmentName(value: string): string {
    const names: Record<string, string> = {
      'hacienda': 'Hacienda',
      'justicia': 'Justicia',
      'educacion': 'Educación',
      'trabajo': 'Trabajo',
      'interior': 'Interior',
      'defensa': 'Defensa',
      'otros': 'Otros'
    };
    return names[value] || value;
  }
}
