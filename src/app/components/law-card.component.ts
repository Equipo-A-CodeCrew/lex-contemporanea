import { Component, Input } from '@angular/core';
import { LawItem } from '../models/boe.model';

@Component({
  selector: 'app-law-card',
  standalone: true,
  imports: [],
  template: `
    <article class="law-card" [class.highlighted]="highlighted">
      <div class="law-header">
        <span class="law-type" [class]="getLawTypeClass()">
          {{ getLawType() }}
        </span>
        <span class="law-id">{{ law.identifier }}</span>
      </div>

      <h4 class="law-title">{{ law.title }}</h4>

      <div class="law-meta">
        @if (department) {
          <div class="meta-item">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
            </svg>
            <span>{{ department }}</span>
          </div>
        }
        
        @if (law.pdfUrl?.szKBytes) {
          <div class="meta-item">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
            </svg>
            <span>{{ law.pdfUrl.szKBytes }} KB</span>
          </div>
        }
      </div>

      <div class="law-actions">
        @if (law.pdfUrl?.text) {
          <a 
            [href]="law.pdfUrl.text" 
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary btn-small"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"/>
            </svg>
            PDF
          </a>
        }

        @if (law.htmlUrl) {
          <a 
            [href]="law.htmlUrl" 
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary btn-small"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            HTML
          </a>
        }

        @if (law.xmlUrl) {
          <a 
            [href]="law.xmlUrl" 
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary btn-small"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            XML
          </a>
        }
      </div>
    </article>
  `,
  styles: [`
    .law-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      transition: all var(--transition-base);
      animation: fadeIn 0.4s ease-out backwards;
      
      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
        border-color: var(--color-accent);
      }
      
      &.highlighted {
        border-color: var(--color-accent);
        background: linear-gradient(to right, rgba(212, 175, 55, 0.03), var(--color-surface));
      }
    }

    .law-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      margin-bottom: var(--space-md);
    }

    .law-type {
      display: inline-block;
      padding: var(--space-xs) var(--space-sm);
      background: rgba(212, 175, 55, 0.1);
      color: var(--color-accent-dark);
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      
      &.ley-organica {
        background: rgba(231, 76, 60, 0.1);
        color: #c0392b;
      }
      
      &.real-decreto {
        background: rgba(52, 152, 219, 0.1);
        color: #2980b9;
      }
      
      &.orden {
        background: rgba(46, 204, 113, 0.1);
        color: #27ae60;
      }
      
      &.resolucion {
        background: rgba(243, 156, 18, 0.1);
        color: #d68910;
      }
    }

    .law-id {
      font-size: 0.75rem;
      color: var(--color-text-lighter);
      font-family: 'Monaco', monospace;
    }

    .law-title {
      margin: 0 0 var(--space-md) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text);
      line-height: 1.5;
      font-family: var(--font-body);
    }

    .law-meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      font-size: 0.8125rem;
      color: var(--color-text-light);
      
      svg {
        flex-shrink: 0;
      }
    }

    .law-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      padding-top: var(--space-md);
      border-top: 1px solid var(--color-border);
    }

    .btn-small {
      padding: var(--space-xs) var(--space-sm);
      font-size: 0.8125rem;
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }
  `]
})
export class LawCardComponent {
  @Input() law!: LawItem;
  @Input() department?: string;
  @Input() highlighted: boolean = false;

  getLawType(): string {
    const title = this.law.title.toLowerCase();
    
    if (title.includes('ley orgánica')) return 'Ley Orgánica';
    if (title.includes('real decreto-ley')) return 'RD-Ley';
    if (title.includes('real decreto')) return 'Real Decreto';
    if (title.includes('orden')) return 'Orden';
    if (title.includes('resolución')) return 'Resolución';
    if (title.includes('acuerdo')) return 'Acuerdo';
    
    return 'Disposición';
  }

  getLawTypeClass(): string {
    const type = this.getLawType().toLowerCase();
    
    if (type.includes('orgánica')) return 'ley-organica';
    if (type.includes('real decreto')) return 'real-decreto';
    if (type.includes('orden')) return 'orden';
    if (type.includes('resolución')) return 'resolucion';
    
    return '';
  }
}
