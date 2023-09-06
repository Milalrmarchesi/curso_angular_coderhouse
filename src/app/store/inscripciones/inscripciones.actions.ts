import { createActionGroup, emptyProps, createAction, props } from "@ngrx/store";
import { InscripcionesInterface } from "src/app/dashboard/pages/inscripciones/models/inscripciones.interface";


export const inscripcionesListLoad = createAction(
    '[Inscripciones List] Cargando inscripciones'
)

export const inscripcionesListStore = createAction(
  '[Inscripciones Store] Inscripciones Cargadas',
  props<{ enrollments: InscripcionesInterface[] | null; loading: boolean }>()
);

export const inscripcionesDelete = createAction(
  '[Inscripciones Delete] Inscripcion elminada',
  props<{enrollment: InscripcionesInterface | null}>()
)


export const inscripcionesPut = createAction(
  '[Inscripciones Put] Inscripcion agregada',
  props<{enrollment: InscripcionesInterface | null}>()
)