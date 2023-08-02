import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlumnosComponent } from './agregar-alumnos.component';

describe('AgregarAlumnosComponent', () => {
  let component: AgregarAlumnosComponent;
  let fixture: ComponentFixture<AgregarAlumnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAlumnosComponent]
    });
    fixture = TestBed.createComponent(AgregarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
