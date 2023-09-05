import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Store } from '@ngrx/store';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private store:Store<any>,
    private httpClient: HttpClient
  ) { }

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