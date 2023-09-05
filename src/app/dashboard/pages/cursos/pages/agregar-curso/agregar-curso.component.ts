import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.scss']
})
export class AgregarCursoComponent {
  studentForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private cursosService: CursosService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeForm();    
  }
  

  initializeForm() {
    this.studentForm = this.formBuilder.group({
      subject: [null, Validators.required],
      classes: [null, Validators.required]
    });
  }

  saveStudent() {
    if (this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      newStudent['id'] = this.cursosService.getNewStudentId();
      newStudent['enabled'] = true;
      this.cursosService.addNewStudent(newStudent);
      this.studentForm.reset();
      this.router.navigate(['/dashboard', 'cursos']);
    }
  }
}

