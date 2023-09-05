import { createReducer, on } from "@ngrx/store";
import { inscripcionesListStore } from "./inscripciones.actions";
import { InscripcionesState } from "src/app/dashboard/pages/inscripciones/models/inscripciones.state"; 

export const enrollmentsFeatureKey = 'enrollments';

const initialState: InscripcionesState = { 
  inscripcionesList: [],
  isLoading: true
}

export const enrollmentsReducer = createReducer(
  initialState,
  on(inscripcionesListStore, (currentState, action) => {
    return {
      inscripcionesList: action.enrollments,
      isLoading: action.loading
    }
  }) 
)