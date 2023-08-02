import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleClasesComponent } from './detalle-clases.component';

describe('DetalleClasesComponent', () => {
  let component: DetalleClasesComponent;
  let fixture: ComponentFixture<DetalleClasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleClasesComponent]
    });
    fixture = TestBed.createComponent(DetalleClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
