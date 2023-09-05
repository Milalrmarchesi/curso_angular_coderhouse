import { InscripcionesInterface } from "./inscripciones.interface";

export interface InscripcionesState {
    inscripcionesList: Array<InscripcionesInterface> | null ;
    isLoading: boolean;
}