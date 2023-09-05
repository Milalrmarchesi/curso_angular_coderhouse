import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseInterface } from '../../models/curso.interface'; 

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})

export class DetalleCursoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CourseInterface) {}
}