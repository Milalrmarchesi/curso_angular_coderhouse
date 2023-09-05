import { ActionReducerMap } from "@ngrx/store";
import { authFeatureKey, authReducer } from "./auth/auth.reducers";
import { AuthState } from "../auth/models/auth.state";
import { UserListState } from "../dashboard/pages/users/models/users.state";
import { usersFeatureKey, usersReducer} from "./users/users.reducers";

export interface AppState {
  [authFeatureKey]: AuthState,
  [usersFeatureKey]: UserListState
}


export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    [authFeatureKey]:authReducer,
    [usersFeatureKey]: usersReducer
}