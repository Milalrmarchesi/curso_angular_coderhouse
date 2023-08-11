import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasesService } from '../../services/clases.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edicion-clases',
  templateUrl: './edicion-clases.component.html',
  styleUrls: ['./edicion-clases.component.scss']
})
export class EdicionClasesComponent {
  clasesEditForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private clasesService: ClasesService,  private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeForm();    
  }
  

  initializeForm() {
    this.clasesEditForm = this.formBuilder.group({
      subject: ['', Validators.required],
      teacher: ['', Validators.required],
      schedule: ['', [Validators.required]],
    });
    let clase = this.clasesService.current;
    let data_to_set = {subject: clase?.subject, teacher: clase?.teacher, schedule: clase?.schedule}
    this.clasesEditForm.setValue(data_to_set);
  }

  saveEditedClase() {
    if (this.clasesEditForm.valid) {
      const editedClase = this.clasesEditForm.value;
      editedClase['id'] = this.clasesService.current.id;
      editedClase['enabled'] = true;
      this.clasesService.saveEditedClase(editedClase);
      this.clasesEditForm.reset();
      this.router.navigate(['/dashboard', 'clases']);
    }
  }
}
