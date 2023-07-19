import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent {
  datosTabla = [
    { columna1: 'Valor 1', columna2: 'Valor 2', columna3: 'Valor 3' },
    { columna1: 'Valor 4', columna2: 'Valor 5', columna3: 'Valor 6' }
  ];

}
