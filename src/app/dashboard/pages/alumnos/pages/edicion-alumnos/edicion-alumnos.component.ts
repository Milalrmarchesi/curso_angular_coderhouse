import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentInterface } from '../../interfaces/student.interface';
import { AlumnosService } from '../../services/alumnos.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edicion-alumnos',
  templateUrl: './edicion-alumnos.component.html',
  styleUrls: ['./edicion-alumnos.component.scss']
})
export class EdicionAlumnosComponent {
  studentEditForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private studentsService: AlumnosService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initializeForm();    
  }
  

  initializeForm() {
    this.studentEditForm = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      score: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
    let student = this.studentsService.current;
    let data_to_set = {name: student.name, lastname: student.lastname, email: student.email, score: student.score}
    this.studentEditForm.setValue(data_to_set);
  }

  saveEditedStudent() {
    if (this.studentEditForm.valid) {
      const editedStudent = this.studentEditForm.value;
      editedStudent['id'] = this.studentsService.current.id;
      this.studentsService.saveEditedStudent(editedStudent);
      this.studentEditForm.reset();
    }
  }
}
