import { Injectable } from '@angular/core';
import { of, interval, Observable, from } from 'rxjs';
import { mergeMap, map, filter, delay, toArray, take} from 'rxjs/operators';
import { StudentInterface } from '../interfaces/student.interface'


@Injectable({
  providedIn: 'root'
})

export class AlumnosService {
  students: StudentInterface[] = [
      {id: 0, subject: 'Algebra I', classes: "1, 2", enabled: true},
      {id: 1, subject: 'Analisis matemático', classes: "2, 3", enabled: true},
      {id: 2, subject: 'Algebra I', classes: "5, 4", enabled: true},
      {id: 3, subject: 'Algebra II', classes: "9, 1, 0", enabled: true},
      {id: 4, subject: 'Física', classes: "8, 2, 4", enabled: true},
      {id: 5, subject: 'Quimica', classes: "4, 2, 6", enabled: true},
      {id: 6, subject: 'Arquitectura de computadoras', classes: "4, 6, 1", enabled: true},
      {id: 7, subject: 'Sistemas operativos', classes: "3, 7, 4", enabled: true},
      {id: 8, subject: 'Mecanica', classes: "7, 9", enabled: true},
      {id: 9, subject: 'Física II', classes: "9, 2, 1", enabled: true},
  ]
  current!: StudentInterface;
  constructor() { }



  getData(): Observable<StudentInterface[]> {
    return from(this.students).pipe(
      filter((student) => !!student && student.enabled),
      map((student) => {
        student.subject = student.subject.toUpperCase();
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

  getNewStudentId(){
    let max_value = 0;
    for (let student of this.students) {
      if (student.id > max_value) {
        max_value = student.id;
      }
    }
    return max_value + 1;
  }

  addNewStudent(student: StudentInterface){
    this.students.push(student);
  }

  deleteStudent(student_id: number){
    this.students = this.students.filter((student) => student.id != student_id);
  }
  saveEditedStudent(student: StudentInterface){
    for(let i=0; i<=this.students.length; i++){
      if(this.students[i].id === student.id){
        this.students[i] = student;
        break;
      }
    }
  }

}
