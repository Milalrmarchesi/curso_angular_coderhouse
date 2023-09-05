import { createActionGroup, emptyProps, createAction, props } from "@ngrx/store";
import { InscripcionesInterface } from "src/app/dashboard/pages/inscripciones/models/inscripciones.interface";


export const inscripcionesListLoad = createAction(
    '[Inscripciones List] Cargando inscripciones'
)

export const inscripcionesListStore = createAction(
  '[Inscripciones List] Inscripciones Cargadas',
  props<{enrollments: Array<InscripcionesInterface> | null, loading: boolean}>()
)
