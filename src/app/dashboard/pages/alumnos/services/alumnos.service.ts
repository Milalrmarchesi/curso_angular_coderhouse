import { Injectable } from '@angular/core';
import { of, interval, Observable, from } from 'rxjs';
import { mergeMap, map, filter, delay, toArray, take} from 'rxjs/operators';
import { StudentInterface } from '../interfaces/student.interface'
import { ClasesService } from '../../clases/services/clases.service'; 


interface StudentsClasses {
  [studentId: number]: number[];
}

@Injectable({
  providedIn: 'root'
})

export class AlumnosService {
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
  current!: StudentInterface;
  students_classes: StudentsClasses = {0: [1, 2], 1: [3, 2], 2: [1, 4], 3: [1, 2, 4], 4: [4, 2], 5: [1, 2], 6: [3, 2], 7: [4, 2]};
  constructor(clasesService: ClasesService) { }



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


  get_classes_by_student(student:StudentInterface){
    if(student.id in this.students_classes){
      return this.students_classes[student.id];
    }else{
      return [];
    }
  }

  unsuscribe_student_class(student:StudentInterface, class_id:number){
    this.students_classes[student.id] = this.students_classes[student.id].filter((row) => row != class_id);
    console.log(this.students_classes[student.id]);
  }

}
