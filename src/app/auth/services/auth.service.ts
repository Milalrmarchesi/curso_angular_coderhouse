import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../../dashboard/pages/users/models/index";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httpClient: HttpClient    
  ) { }

  isAuthenticated(): Observable<boolean> {
    let token = localStorage.getItem('token') || '';
    return this.httpClient.get<User[]>(environment.apiUrl + '/users').pipe(
      map((usersResult) => {

        if (usersResult.length) {
          const authUser = usersResult[0];
        }

        return !!usersResult.length
      })
    )
  }
}
