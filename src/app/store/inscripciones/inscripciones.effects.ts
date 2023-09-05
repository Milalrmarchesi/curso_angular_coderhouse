import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as inscripcionesListActions from './inscripciones.actions';
import { delay, map, mergeMap } from "rxjs/operators";
import { of,from } from "rxjs";
import { InscripcionesService } from "src/app/dashboard/pages/inscripciones/services/inscripciones.service";

@Injectable()
export class EnrollmentsEffects {
    constructor(private actions: Actions, private inscripcionesService: InscripcionesService) {}
    
    loadUsers = createEffect(() => this.actions.pipe(
        ofType(inscripcionesListActions.inscripcionesListLoad),
        map(enrollments => (inscripcionesListActions.inscripcionesListStore({enrollments: [], loading: true}))),
        mergeMap(() => from(this.inscripcionesService.getAllEnrollments())
            .pipe(
                map(enrollments => (inscripcionesListActions.inscripcionesListStore({enrollments: enrollments, loading: false})))
            )
        )
    ));

}


