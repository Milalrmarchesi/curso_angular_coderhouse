import { User } from "src/app/dashboard/pages/users/models/user";
export interface AuthState {
    authUser: User | null | undefined;
    token: string | undefined | null;
}