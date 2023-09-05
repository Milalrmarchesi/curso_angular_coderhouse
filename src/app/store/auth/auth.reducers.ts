import { createReducer, on } from "@ngrx/store";
import { authUserLogin, authUserLogout } from "./auth.actions";
import { AuthState } from "src/app/auth/models/auth.state"; 

export const authFeatureKey = 'auth';

const initialState: AuthState = { 
  authUser: null,
  token: null
}

export const authReducer = createReducer(
  initialState,
  on(authUserLogin, (currentState, action) => {
    return {
      authUser: action.user,
      token: action.token
    }
  }),
  on(authUserLogout, (currentState, action) => {
    return {
      authUser: null,
      token: null
    }
  })  
)