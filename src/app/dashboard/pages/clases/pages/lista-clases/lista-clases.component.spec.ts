import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClasesComponent } from './lista-clases.component';

describe('ListaClasesComponent', () => {
  let component: ListaClasesComponent;
  let fixture: ComponentFixture<ListaClasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaClasesComponent]
    });
    fixture = TestBed.createComponent(ListaClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
