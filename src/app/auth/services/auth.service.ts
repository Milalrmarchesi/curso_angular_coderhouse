import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, map, of, catchError, BehaviorSubject } from "rxjs";
import { User } from "../../dashboard/pages/users/models/user";
import { Token } from "../../dashboard/pages/users/models/token";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private dataSession: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    address: "",
    avatar: "",
    createdAt: "",
    role: ""
  });
  
  constructor(
    private store:Store<any>,
    private router: Router,
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService    
  ) { }

  get sessionObservable(): Observable<User> {
    return this.dataSession.asObservable();
  }

  updateValue(newValue: User): void {
    this.dataSession.next(newValue);
  }

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
            console.log("FALSE 1")
            return false
          }
        }),
        catchError(() => {
          console.log("FALSE 2")
          return of(false)
        })
      )
    } else {
      return of(false);
    }    
  }

  async login(id_username: string, password: string): Promise<any> {
    try {
      let token = null;
      const response = await this.httpClient.get<User>(environment.apiUrl + 'users/' + id_username).toPromise();
      if (response && response["password"] == password) {
        token = await this.createAndSaveToken(response);
        this.updateValue(response);
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard/home']); // Navegar a la ruta correcta
      } else {
        console.log("Login incorrecto");
      }
      return {response: response, token: token};
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.log('Ocurrió un error inesperado');
      }else{
        console.log(error);
      }
      return {response: null, token: null};
    }
  }

  async createAndSaveToken(user_data: any): Promise<string>{
    console.log("Generando token para user_data: ", user_data);
    // Deberia tener un backend por ejemplo en node para generar tokens. No los debo generar del lado front.
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

  async getAllUsers(): Promise<Array<User> | null> {
    try {
      const response = await this.httpClient.get<Array<User>>(environment.apiUrl + 'users').toPromise();
      if (response) {
        return response;
      } else {
        console.log("Hubo un error al traer los datos");
        return null;
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.log('Ocurrió un error inesperado');
      }else{
        console.log(error);
      }
      return null;
    }
  }  

}
