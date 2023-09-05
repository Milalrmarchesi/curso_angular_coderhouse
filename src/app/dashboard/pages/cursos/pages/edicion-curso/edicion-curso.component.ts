import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edicion-curso',
  templateUrl: './edicion-curso.component.html',
  styleUrls: ['./edicion-curso.component.scss']
})
export class EdicionCursoComponent {
  studentEditForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private cursosService: CursosService,  private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeForm();    
  }
  

  initializeForm() {
    this.studentEditForm = this.formBuilder.group({
      subject: [null, Validators.required],
      classes: [null, Validators.required]
    });
    let student = this.cursosService.current;
    let data_to_set = {subject: student.subject, classes: student.classes};
    this.studentEditForm.setValue(data_to_set);
  }

  saveEditedStudent() {
    if (this.studentEditForm.valid) {
      const editedStudent = this.studentEditForm.value;
      editedStudent['id'] = this.cursosService.current.id;
      editedStudent['enabled'] = true;
      this.cursosService.saveEditedStudent(editedStudent);
      this.studentEditForm.reset();
      this.router.navigate(['/dashboard', 'cursos']);
    }
  }
}
