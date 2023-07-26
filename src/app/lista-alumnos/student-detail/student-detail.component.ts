import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentInterface } from '../alumno.interface';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})

export class StudentDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: StudentInterface) {}
}
