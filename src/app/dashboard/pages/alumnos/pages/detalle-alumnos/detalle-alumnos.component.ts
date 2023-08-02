import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentInterface } from '../../interfaces/student.interface'; 

@Component({
  selector: 'app-detalle-alumnos',
  templateUrl: './detalle-alumnos.component.html',
  styleUrls: ['./detalle-alumnos.component.scss']
})

export class DetalleAlumnosComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: StudentInterface) {}
}