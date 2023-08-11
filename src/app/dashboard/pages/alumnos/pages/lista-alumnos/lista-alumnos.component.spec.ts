import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ListaAlumnosComponent } from './lista-alumnos.component';
import { AlumnosService } from '../../services/alumnos.service';

describe('ListaAlumnosComponent', () => {
  let component: ListaAlumnosComponent;
  let fixture: ComponentFixture<ListaAlumnosComponent>;
  let mockAlumnosService: jasmine.SpyObj<AlumnosService>;

  beforeEach(() => {
    mockAlumnosService = jasmine.createSpyObj('AlumnosService', ['getData', 'deleteStudent']);
    
    TestBed.configureTestingModule({
      declarations: [ListaAlumnosComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AlumnosService, useValue: mockAlumnosService },
      ],
    });

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on ngOnInit', () => {
    const mockStudentsArray = [{ id: 1, name: 'Mili', lastname: 'Reyna', email: 'milireyna@coderhouse.com', score: 9, enabled: true }];
    mockAlumnosService.getData.and.returnValue(of(mockStudentsArray));

    component.ngOnInit();

    expect(component.students).toEqual(mockStudentsArray);
    expect(component.dataLoaded).toBeTrue();
  });
});
