import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseTest } from './response-test';

describe('ResponseTest', () => {
  let component: ResponseTest;
  let fixture: ComponentFixture<ResponseTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
