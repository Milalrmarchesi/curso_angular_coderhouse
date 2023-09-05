import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from './auth.actions';
import { delay, map, mergeMap } from "rxjs/operators";
import { of,from } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";


@Injectable()
export class AuthEffects {
    constructor(private actions: Actions, private authService: AuthService) {}
    
    loadUsers = createEffect(() => this.actions.pipe(
        ofType(authActions.authGetUsers),
        mergeMap(() => from(this.authService.getAllUsers())
            .pipe(
                map(users => ({type: '[Users List] Loaded Success', users}))
            )
        )
    ));

}


