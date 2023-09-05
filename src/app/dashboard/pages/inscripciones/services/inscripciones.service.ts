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
  constructor() { }

  getAllEnrollments(): Observable<InscripcionesInterface[]> {
    return from(this.enrollments).pipe(
      filter((enrollment) => !!enrollment && enrollment.enabled),
      map((enrollment) => {
        enrollment.course.subject = enrollment.course.subject.toUpperCase();
        return enrollment;
      }),
      delay(3000),
      toArray()
    );
  }

  getClasesById(id: number): Promise<InscripcionesInterface | null> {
    const enrollment = this.enrollments.find((enrollment) => enrollment.id === id);
    return Promise.resolve(enrollment || null);
  }

  getNewClaseId(){
    let max_value = 0;
    for (let enrollment of this.enrollments) {
      if (enrollment.id > max_value) {
        max_value = enrollment.id;
      }
    }
    return max_value + 1;
  }

  addNewClase(enrollment: InscripcionesInterface){
    this.enrollments.push(enrollment);
  }

  deleteClase(enrollment_id: number){
    this.enrollments = this.enrollments.filter((enrollment) => enrollment.id != enrollment_id);
  }

  saveEditedClase(clase: InscripcionesInterface){
    for(let i=0; i<=this.enrollments.length; i++){
      if(this.enrollments[i].id === clase.id){
        this.enrollments[i] = clase;
        break;
      }
    }
  }

}
