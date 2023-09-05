import { createActionGroup, emptyProps, createAction, props } from "@ngrx/store";
import { User } from "src/app/dashboard/pages/users/models/user";


export const userListLoad = createAction(
    '[Auth user] Usuarios cargados',
    props<{users: Array<User> | undefined | null}>()
)
