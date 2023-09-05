import { createActionGroup, emptyProps, createAction, props } from "@ngrx/store";
import { User } from "src/app/dashboard/pages/users/models/user";


export const userListLoad = createAction(
    '[User List] Cargando usuarios'
)

export const userListStore = createAction(
  '[User List] Usuarios cargados',
  props<{users: Array<User> | undefined | null}>()
)
