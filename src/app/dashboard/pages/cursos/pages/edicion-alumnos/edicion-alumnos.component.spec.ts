import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionAlumnosComponent } from './edicion-alumnos.component';

describe('EdicionAlumnosComponent', () => {
  let component: EdicionAlumnosComponent;
  let fixture: ComponentFixture<EdicionAlumnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdicionAlumnosComponent]
    });
    fixture = TestBed.createComponent(EdicionAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
