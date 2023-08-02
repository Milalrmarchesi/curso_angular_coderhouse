import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlumnosComponent } from './detalle-alumnos.component';

describe('DetalleAlumnosComponent', () => {
  let component: DetalleAlumnosComponent;
  let fixture: ComponentFixture<DetalleAlumnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAlumnosComponent]
    });
    fixture = TestBed.createComponent(DetalleAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
