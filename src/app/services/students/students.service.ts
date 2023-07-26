import { Injectable } from '@angular/core';
import { of, interval, Observable, from } from 'rxjs';
import { mergeMap, map, filter, delay, toArray, take} from 'rxjs/operators';
import { StudentInterface } from './../../lista-alumnos/alumno.interface';


@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  students: StudentInterface[] = [
      {id: 0, name: 'Milagros', lastname: "Marchesi", email: 'mili@gmail.com', score: 10, enabled: true},
      {id: 1, name: 'Lucas', lastname: "Etcheverry", email: 'lucas@gmail.com', score: 8, enabled: true},
      {id: 2, name: 'Facundo', lastname: "Gomez", email: 'facu@gmail.com', score: 7, enabled: true},
      {id: 3, name: 'Morena', lastname: "Rial", email: 'more@gmail.com', score: 9, enabled: true},
      {id: 4, name: 'Lisa', lastname: "Althabe", email: 'lisAlt@gmail.com', score: 5, enabled: true},
      {id: 5, name: 'Brenda', lastname: "Chiaia", email: 'brenChi@gmail.com', score: 4, enabled: false},
      {id: 6, name: 'Agus', lastname: "Izzi", email: 'Izziagustin@gmail.com', score: 7, enabled: true},
      {id: 7, name: 'Juan', lastname: "Mezzetti", email: 'jm@gmail.com', score: 9, enabled: false}
  ]
  constructor() { }



  getData(): Observable<StudentInterface[]> {
    return from(this.students).pipe(
      filter((student) => !!student && student.enabled),
      map((student) => {
        student.email = student.email.toLowerCase();
        return student;
      }),
      delay(3000),
      toArray()
    );
  }

  getStudentById(id: number): Promise<StudentInterface | null> {
    const student = this.students.find((student) => student.id === id);
    return Promise.resolve(student || null);
  }

}
