import { Injectable } from '@angular/core';
import { of, interval, Observable } from 'rxjs';
import { mergeMap, map, filter, delay } from 'rxjs/operators';
import { StudentInterface } from './../../lista-alumnos/alumno.interface';


@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  students = of(
      {id: 0, name: 'Milagros', lastname: "Marchesi", email: 'mili@gmail.com', score: 10, enabled: true},
      {id: 1, name: 'Lucas', lastname: "Etcheverry", email: 'lucas@gmail.com', score: 8, enabled: true},
      {id: 2, name: 'Facundo', lastname: "Gomez", email: 'facu@gmail.com', score: 7, enabled: true},
      {id: 3, name: 'Morena', lastname: "Rial", email: 'more@gmail.com', score: 9, enabled: true},
      {id: 4, name: 'Lisa', lastname: "Althabe", email: 'lisAlt@gmail.com', score: 5, enabled: true},
      {id: 5, name: 'Brenda', lastname: "Chiaia", email: 'brenChi@gmail.com', score: 4, enabled: false},
      {id: 6, name: 'Agus', lastname: "Izzi", email: 'Izziagustin@gmail.com', score: 7, enabled: true},
      {id: 7, name: 'Juan', lastname: "Mezzetti", email: 'jm@gmail.com', score: 9, enabled: false}
  )
  constructor() { 
    //result.subscribe(x => console.log(x));
  }

  getData(){

    
    const result = this.students.pipe(
      filter((student) => (student !== null && student["enabled"])),
      map((student) => {
        student["email"] = student["email"].toLowerCase();
        return student;
      })      
    );  
    

    /*
    const result = this.students.pipe(
      mergeMap((student) => interval(1000).pipe(
        filter((index) => student["enabled"]),
        map((index) => {
          student["email"] = student["email"].toLowerCase();
          return student;
        })
      ))
    );
    */
    /*    
    return of(this.students).pipe(
      delay(2000),
      filter((students) => students !== null)
    );
    */
  
    return result; 
  }
}
