import { User } from "src/app/dashboard/pages/users/models/user";
export interface UserListState {
    usersList: Array<User> | null | undefined;
}