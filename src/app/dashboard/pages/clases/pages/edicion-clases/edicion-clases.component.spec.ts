import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionClasesComponent } from './edicion-clases.component';

describe('EdicionClasesComponent', () => {
  let component: EdicionClasesComponent;
  let fixture: ComponentFixture<EdicionClasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdicionClasesComponent]
    });
    fixture = TestBed.createComponent(EdicionClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
