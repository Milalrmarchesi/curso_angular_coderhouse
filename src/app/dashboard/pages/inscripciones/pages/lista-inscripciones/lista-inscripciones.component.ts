import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { inscripcionesListLoad } from 'src/app/store/inscripciones/inscripciones.actions';
import { selectDataEnrollmentLoaded, selectListEnrollments } from 'src/app/store/inscripciones/inscripciones.selectors';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent {
  enrollments$: Observable<any> = new Observable();
  dataLoaded$: Observable<any> = new Observable();
  constructor(private store:Store<any>, private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.enrollments$ = this.store.select(selectListEnrollments);
    this.dataLoaded$ = this.store.select(selectDataEnrollmentLoaded);
    this.store.dispatch(inscripcionesListLoad());
  }
}
