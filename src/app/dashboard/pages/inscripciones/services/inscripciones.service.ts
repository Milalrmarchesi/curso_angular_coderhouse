import { Injectable } from '@angular/core';
import { of, interval, Observable, from } from 'rxjs';
import { mergeMap, map, filter, delay, toArray, take} from 'rxjs/operators';
import { InscripcionesInterface } from '../models/inscripciones.interface';

@Injectable({
  providedIn: 'root'
})

export class InscripcionesService {
  enrollments: InscripcionesInterface[] = []
  current!: InscripcionesInterface;
  constructor() { 
    // inicializo con algunas inscripciones:
    let curso = {id: 0, subject: 'Algebra I', classes: "1, 2", enabled: true};
    let alumno = {id: 0, name: 'Milagros', lastname: "Marchesi", email: 'mili@gmail.com', score: 10, enabled: true};
    let inscripcion = {id: this.getNewEnrollmentId(), student: alumno, course: curso, enabled: true};
    this.enrollments.push(inscripcion)

    curso = {id: 4, subject: 'Física', classes: "8, 2, 4", enabled: true};
    alumno = {id: 0, name: 'Milagros', lastname: "Marchesi", email: 'mili@gmail.com', score: 10, enabled: true};
    inscripcion = {id: this.getNewEnrollmentId(), student: alumno, course: curso, enabled: true};
    this.enrollments.push(inscripcion)

    curso = {id: 6, subject: 'Arquitectura de computadoras', classes: "4, 6, 1", enabled: true};
    alumno = {id: 0, name: 'Milagros', lastname: "Marchesi", email: 'mili@gmail.com', score: 10, enabled: true};
    inscripcion = {id: this.getNewEnrollmentId(), student: alumno, course: curso, enabled: true};
    this.enrollments.push(inscripcion)

    curso = {id: 4, subject: 'Física', classes: "8, 2, 4", enabled: true};
    alumno = {id: 5, name: 'Brenda', lastname: "Chiaia", email: 'brenChi@gmail.com', score: 4, enabled: true};
    inscripcion = {id: this.getNewEnrollmentId(), student: alumno, course: curso, enabled: true};
    this.enrollments.push(inscripcion)

    curso = {id: 6, subject: 'Arquitectura de computadoras', classes: "4, 6, 1", enabled: true};
    alumno = {id: 5, name: 'Brenda', lastname: "Chiaia", email: 'brenChi@gmail.com', score: 4, enabled: true};
    inscripcion = {id: this.getNewEnrollmentId(), student: alumno, course: curso, enabled: true};
    this.enrollments.push(inscripcion)

    curso = {id: 9, subject: 'Física II', classes: "9, 2, 1", enabled: true};
    alumno = {id: 6, name: 'Agus', lastname: "Izzi", email: 'Izziagustin@gmail.com', score: 7, enabled: true};
    inscripcion = {id: this.getNewEnrollmentId(), student: alumno, course: curso, enabled: true};
    this.enrollments.push(inscripcion)

    curso = {id: 5, subject: 'Quimica', classes: "4, 2, 6", enabled: true};
    alumno = {id: 6, name: 'Agus', lastname: "Izzi", email: 'Izziagustin@gmail.com', score: 7, enabled: true};
    inscripcion = {id: this.getNewEnrollmentId(), student: alumno, course: curso, enabled: true};
    this.enrollments.push(inscripcion)   

  }

  getAllEnrollments(): Observable<InscripcionesInterface[]> {
    return from(this.enrollments).pipe(
      filter((enrollment) => !!enrollment && enrollment.enabled),
      map((enrollment) => {
        return enrollment;
      }),
      delay(3000),
      toArray()
    );
  }

  deleteEnrollment(enrollment: InscripcionesInterface): Observable<InscripcionesInterface[]>{
    this.enrollments = this.enrollments.filter((enroll) => enroll.id !== enrollment.id);
    return from(this.enrollments).pipe(
      filter((enrollment) => !!enrollment && enrollment.enabled),
      map((enrollment) => {
        return enrollment;
      }),
      delay(3000),
      toArray()
    );    
  }

  putEnrollment(enrollment: InscripcionesInterface): Observable<InscripcionesInterface[]>{
    enrollment.id = this.getNewEnrollmentId();
    this.enrollments.push(enrollment);
    return from(this.enrollments).pipe(
      filter((enrollment) => !!enrollment && enrollment.enabled),
      map((enrollment) => {
        return enrollment;
      }),
      delay(3000),
      toArray()
    );    
  }

  getNewEnrollmentId(){
    let max_value = 0;
    for (let enrollment of this.enrollments) {
      if (enrollment.id > max_value) {
        max_value = enrollment.id;
      }
    }
    return max_value + 1;
  }

  
}
