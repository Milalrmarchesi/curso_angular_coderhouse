import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClasesComponent } from './agregar-clases.component';

describe('AgregarClasesComponent', () => {
  let component: AgregarClasesComponent;
  let fixture: ComponentFixture<AgregarClasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarClasesComponent]
    });
    fixture = TestBed.createComponent(AgregarClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
