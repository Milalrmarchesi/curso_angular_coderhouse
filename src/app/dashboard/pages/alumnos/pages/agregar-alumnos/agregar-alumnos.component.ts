import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../../services/alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-alumnos',
  templateUrl: './agregar-alumnos.component.html',
  styleUrls: ['./agregar-alumnos.component.scss']
})
export class AgregarAlumnosComponent {
  studentForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private studentsService: AlumnosService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeForm();    
  }
  

  initializeForm() {
    this.studentForm = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      score: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  saveStudent() {
    if (this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      newStudent['id'] = this.studentsService.getNewStudentId();
      newStudent['enabled'] = true;
      this.studentsService.addNewStudent(newStudent);
      this.studentForm.reset();
      this.router.navigate(['/dashboard', 'alumnos']);
    }
  }
}

