import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentInterface } from './alumno.interface';
import { StudentsService } from '../services/students/students.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})


export class ListaAlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'email', 'score', 'actions'];
  dataSource: StudentInterface[] = [];
  showList:boolean = true;
  showAddForm:boolean = false;
  showEditForm:boolean = false;
  studentForm!: FormGroup;
  currentStudent!: StudentInterface;
  studentEditForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private studentsService: StudentsService) {}

  ngOnInit() {
    this.loadStudents();
    this.initializeForm();
  }

  loadStudents(){
    let dataSource$ = this.studentsService.getData();
    dataSource$.subscribe((studentsArray) => {
      this.dataSource.push(studentsArray);
    });    
  }

  initializeForm() {
    this.studentForm = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      score: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
    
    this.studentEditForm = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      score: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  saveStudent() {
    if (this.studentForm.valid) {
      let student = this.studentForm.value;
      student["id"] = this.getNewStudentId()
      student["enabled"] = true;
      this.currentStudent = student;
      this.dataSource.push(this.currentStudent);
      this.showList = true;
      this.showAddForm = false;
      this.showEditForm = false;   
      this.studentForm.reset();  
    }
  }

  saveEditedStudent(){
    if (this.studentEditForm.valid) {
      let student = this.studentEditForm.value;
      student["id"] = this.currentStudent.id;
      let new_array_source = [];
      for(let student_row of this.dataSource){
        if(student.id != student_row.id){
          new_array_source.push(student_row);
        } else{
          new_array_source.push(student);
        }
      }    
      this.dataSource = new_array_source;
      this.showList = true;
      this.showAddForm = false;
      this.showEditForm = false;   
      this.studentEditForm.reset();  
    }
  }
  
  addNewStudent(){
    this.showList = false;
    this.showAddForm = true;
    this.showEditForm = false;
  }

  editStudent(student:StudentInterface){
    this.showList = false;
    this.showAddForm = false;
    this.showEditForm = true;
    this.currentStudent = student;
    let data_to_set = {name: student.name, lastname: student.lastname, email: student.email, score: student.score}
    this.studentEditForm.setValue(data_to_set);
  }

  deleteStudent(student_id:number){
    let new_array = [];
    for(let student of this.dataSource){
      if(student.id != student_id){
        new_array.push(student);
      }
    }    
    this.dataSource = new_array;

  }

  getNewStudentId(){
    let max_value = 0;
    for(let student of this.dataSource){
      if(student.id > max_value){
        max_value = student.id;
      }
    }
    return (max_value + 1);
  }

}
