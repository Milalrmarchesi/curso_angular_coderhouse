import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InscripcionesState } from "src/app/dashboard/pages/inscripciones/models/inscripciones.state"; 
import { enrollmentsFeatureKey } from "./inscripciones.reducers";

export const selectEnrollmentsState = createFeatureSelector<InscripcionesState>(enrollmentsFeatureKey);
export const selectListEnrollments = createSelector(selectEnrollmentsState, (state) => state.inscripcionesList);
export const selectDataEnrollmentLoaded = createSelector(selectEnrollmentsState, (state) => (state.isLoading === false));
