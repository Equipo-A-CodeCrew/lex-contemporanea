import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFilters } from './default-filters';

describe('DefaultFilters', () => {
  let component: DefaultFilters;
  let fixture: ComponentFixture<DefaultFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
