import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentInterface } from '../../interfaces/student.interface'; 
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-detalle-alumnos',
  templateUrl: './detalle-alumnos.component.html',
  styleUrls: ['./detalle-alumnos.component.scss']
})

export class DetalleAlumnosComponent {
  cursos: number[] = [];
  constructor(private alumnosService: AlumnosService, @Inject(MAT_DIALOG_DATA) public data: StudentInterface) {
    this.cursos = this.alumnosService.get_classes_by_student(data);
  }

  eliminar(curso:number){
    this.alumnosService.unsuscribe_student_class(this.data, curso);
    this.cursos = this.alumnosService.get_classes_by_student(this.data);
  }
}