import { createActionGroup, emptyProps, createAction, props } from "@ngrx/store";
import { User } from "src/app/dashboard/pages/users/models/user";


export const authUserLogin = createAction(
    '[Auth Login] Usuario logueado',
    props<{user: User | undefined | null, token: string | undefined | null}>()
)

export const authUserLogout = createAction(
  '[Auth Login] Usuario deslogueado'
)

export const authGetUsers = createAction(
  '[Auth Users] Obtiene el listado de usuarios'
)