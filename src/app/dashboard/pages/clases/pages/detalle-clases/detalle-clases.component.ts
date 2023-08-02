import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClasesInterface } from '../../interfaces/clases.interface'; 

@Component({
  selector: 'app-detalle-clases',
  templateUrl: './detalle-clases.component.html',
  styleUrls: ['./detalle-clases.component.scss']
})

export class DetalleClasesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ClasesInterface) {}
}