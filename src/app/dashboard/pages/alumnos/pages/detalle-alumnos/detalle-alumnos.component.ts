import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentInterface } from '../../interfaces/student.interface'; 
import { AlumnosService } from '../../services/alumnos.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectListEnrollments } from 'src/app/store/inscripciones/inscripciones.selectors';
import { InscripcionesInterface } from '../../../inscripciones/models/inscripciones.interface';
import { inscripcionesDelete, inscripcionesListLoad, inscripcionesListStore } from 'src/app/store/inscripciones/inscripciones.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-alumnos',
  templateUrl: './detalle-alumnos.component.html',
  styleUrls: ['./detalle-alumnos.component.scss']
})

export class DetalleAlumnosComponent {
  cursos: number[] = [];
  enrollments$: Observable<any> = new Observable();

  constructor(private store:Store<any>, private alumnosService: AlumnosService, @Inject(MAT_DIALOG_DATA) public data: StudentInterface) {
  }

  ngOnInit() {
    this.enrollments$ = this.store.select(selectListEnrollments);
    this.store.dispatch(inscripcionesListLoad())
  }

  eliminar(enrollment: InscripcionesInterface | null){
    if (enrollment) {
      this.store.dispatch(inscripcionesDelete({ enrollment }));
      this.store.dispatch(inscripcionesListLoad())
    }
  }
}