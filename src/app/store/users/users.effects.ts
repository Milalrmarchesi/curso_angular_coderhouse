import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as userListActions from './users.actions';
import { delay, map, mergeMap } from "rxjs/operators";
import { of,from } from "rxjs";
import { UserService } from "src/app/dashboard/pages/users/services/users.service";

@Injectable()
export class UsersEffects {
    constructor(private actions: Actions, private userService: UserService) {}
    
    loadUsers = createEffect(() => this.actions.pipe(
        ofType(userListActions.userListLoad),
        mergeMap(() => from(this.userService.getAllUsers())
            .pipe(
                map(users => (userListActions.userListStore({users: users})))
            )
        )
    ));

}


