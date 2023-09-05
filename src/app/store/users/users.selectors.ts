import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserListState } from "src/app/dashboard/pages/users/models/users.state";
import { usersFeatureKey } from "./users.reducers";

export const selectUsersState = createFeatureSelector<UserListState>(usersFeatureKey);
export const selectListUsers = createSelector(selectUsersState, (state) => state.usersList);