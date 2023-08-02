import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../../services/alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edicion-alumnos',
  templateUrl: './edicion-alumnos.component.html',
  styleUrls: ['./edicion-alumnos.component.scss']
})
export class EdicionAlumnosComponent {
  studentEditForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private studentsService: AlumnosService,  private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeForm();    
  }
  

  initializeForm() {
    this.studentEditForm = this.formBuilder.group({
      subject: [null, Validators.required],
      classes: [null, Validators.required]
    });
    let student = this.studentsService.current;
    let data_to_set = {subject: student.subject, classes: student.classes};
    this.studentEditForm.setValue(data_to_set);
  }

  saveEditedStudent() {
    if (this.studentEditForm.valid) {
      const editedStudent = this.studentEditForm.value;
      editedStudent['id'] = this.studentsService.current.id;
      editedStudent['enabled'] = true;
      this.studentsService.saveEditedStudent(editedStudent);
      this.studentEditForm.reset();
      this.router.navigate(['/dashboard', 'cursos']);
    }
  }
}
