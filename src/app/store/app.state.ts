import { ActionReducerMap } from "@ngrx/store";
import { authFeatureKey, authReducer } from "./auth/auth.reducers";
import { AuthState } from "../auth/models/auth.state";
import { UserListState } from "../dashboard/pages/users/models/users.state";
import { usersFeatureKey, usersReducer} from "./users/users.reducers";
import { InscripcionesState } from "src/app/dashboard/pages/inscripciones/models/inscripciones.state"; 
import { enrollmentsFeatureKey, enrollmentsReducer } from "./inscripciones/inscripciones.reducers";

export interface AppState {
  [authFeatureKey]: AuthState,
  [usersFeatureKey]: UserListState,
  [enrollmentsFeatureKey]: InscripcionesState
}


export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    [authFeatureKey]:authReducer,
    [usersFeatureKey]: usersReducer,
    [enrollmentsFeatureKey]: enrollmentsReducer
}