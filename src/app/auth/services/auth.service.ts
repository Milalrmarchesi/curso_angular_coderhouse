import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, map, of, catchError } from "rxjs";
import { User } from "../../dashboard/pages/users/models/user";
import { Token } from "../../dashboard/pages/users/models/token";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService    
  ) { }

  isAuthenticated(): Observable<boolean> {
    let token = localStorage.getItem('token') || '';
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.httpClient.get<Token[]>(environment.apiUrl + 'tokens').pipe(
        map((tokensResult) => {
          const result = tokensResult.filter((token_data) => token_data.token == token);
          if (result.length) {
            console.log("tokensResult: ", result);
            return true
          }else{
            return false
          }
        }),
        catchError(() => of(false))
      )
    } else {
      return of(false);
    }    
  }

  async login(id_username: string, password: string) {
    try {
      const response = await this.httpClient.get<User>(environment.apiUrl + 'users/' + id_username).toPromise();
      if (response && response["password"] == password) {
        const token = await this.createAndSaveToken(response);
        this.router.navigate(['/dashboard/home']); // Navegar a la ruta correcta
        localStorage.setItem('token', token);
      } else {
        console.log("Login incorrecto");
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.log('Ocurrió un error inesperado');
      }
    }
  }

  async createAndSaveToken(user_data: any): Promise<string>{
    console.log("Generando token para user_data: ", user_data);
    // Deberia tener un backen por ejemplo en node para generar tokens. No los debo generar del lado front.
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTE1NTEzNTEsImV4cCI6MTcyMzA4NzM1MSwiYXVkIjoiaHR0cHM6Ly82NGQyZDk4ZDY3YjI2NjJiZjNkYjdhYTgubW9ja2FwaS5pby9hcGkvdjEvIiwic3ViIjoiZXhhbXBsZSIsIm5hbWUiOiJ0ZXN0IiwidXNlcm5hbWUiOiJ0ZXN0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.jbiFPotOtXmkGCtyjkXoCV0d9fsi0XFoYcqoNZzwn1E";
    let token_obj = {token: token, expire: new Date() };
    try {
      await this.httpClient.post<Token>(environment.apiUrl + "tokens", token_obj).toPromise();
      return token;
    } catch (error) {
      console.error("Error al guardar el token:", error);
      throw error;
    }
  }
}
