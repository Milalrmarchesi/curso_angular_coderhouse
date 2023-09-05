import { createReducer, on } from "@ngrx/store";
import { userListLoad } from "./users.actions";
import { UserListState } from "src/app/dashboard/pages/users/models/users.state"; 

export const usersFeatureKey = 'users';

const initialState: UserListState = { 
  usersList: []
}

export const usersReducer = createReducer(
  initialState,
  on(userListLoad, (currentState, action) => {
    return {
      usersList: action.users
    }
  }) 
)