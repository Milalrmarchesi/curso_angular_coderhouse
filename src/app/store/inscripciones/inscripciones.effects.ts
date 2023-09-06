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
    deleteEnrollment = createEffect(() =>
        this.actions.pipe(
            ofType(inscripcionesListActions.inscripcionesDelete),
            mergeMap((action) => {
                if (action.enrollment) {
                return from(this.inscripcionesService.deleteEnrollment(action.enrollment)).pipe(
                    map((enrollments) =>
                    inscripcionesListActions.inscripcionesListStore({
                        enrollments,
                        loading: false,
                    })
                    )
                );
                } else {
                    return of({ type: 'EMPTY_ACTION' });
                }
            })
        ),
        { dispatch: false }
    );
    addEnrollment = createEffect(() =>
        this.actions.pipe(
            ofType(inscripcionesListActions.inscripcionesPut),
            mergeMap((action) => {
                if (action.enrollment) {
                return from(this.inscripcionesService.putEnrollment(action.enrollment)).pipe(
                    map((enrollments) =>
                    inscripcionesListActions.inscripcionesListStore({
                        enrollments,
                        loading: false,
                    })
                    )
                );
                } else {
                    return of({ type: 'EMPTY_ACTION' });
                }
            })
        ),
        { dispatch: false }
    );    
}


