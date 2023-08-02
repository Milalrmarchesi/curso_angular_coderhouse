import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasesService } from '../../services/clases.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-clases',
  templateUrl: './agregar-clases.component.html',
  styleUrls: ['./agregar-clases.component.scss']
})
export class AgregarClasesComponent {
  claseForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private clasesService: ClasesService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeForm();    
  }
  

  initializeForm() {
    this.claseForm = this.formBuilder.group({
      subject: [null, Validators.required],
      teacher: [null, [Validators.required]],
      schedule: [null, [Validators.required]]
    });
  }

  saveClase() {
    if (this.claseForm.valid) {
      const newClase = this.claseForm.value;
      newClase['id'] = this.clasesService.getNewClaseId();
      newClase['enabled'] = true;
      this.clasesService.addNewClase(newClase);
      this.claseForm.reset();
      this.router.navigate(['/dashboard', 'clases']);
    }
  }
}

