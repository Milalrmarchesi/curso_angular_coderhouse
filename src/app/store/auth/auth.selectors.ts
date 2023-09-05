import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey } from "./auth.reducers";
import { AuthState } from "src/app/auth/models/auth.state";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
export const selectUsersState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser);

export const selecteAuthUserRole = createSelector(selectAuthState, (state) => state.authUser?.role)

export const selectIsAdmin = createSelector(selectAuthState, (state) => state.authUser?.role === 'ADMINISTRADOR')

export const selectToken = createSelector(selectAuthState, (state) => state.token)
