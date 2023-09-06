import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseInterface } from '../../models/curso.interface'; 
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectListEnrollments } from 'src/app/store/inscripciones/inscripciones.selectors';
import { InscripcionesInterface } from '../../../inscripciones/models/inscripciones.interface';
import { inscripcionesDelete, inscripcionesListLoad, inscripcionesListStore } from 'src/app/store/inscripciones/inscripciones.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})

export class DetalleCursoComponent {
  enrollments$: Observable<any> = new Observable();
  constructor(private store:Store<any>, @Inject(MAT_DIALOG_DATA) public data: CourseInterface) {
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

