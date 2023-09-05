import { createReducer, on } from "@ngrx/store";
import { userListStore } from "./users.actions";
import { UserListState } from "src/app/dashboard/pages/users/models/users.state"; 

export const usersFeatureKey = 'users';

const initialState: UserListState = { 
  usersList: []
}

export const usersReducer = createReducer(
  initialState,
  on(userListStore, (currentState, action) => {
    return {
      usersList: action.users
    }
  }) 
)