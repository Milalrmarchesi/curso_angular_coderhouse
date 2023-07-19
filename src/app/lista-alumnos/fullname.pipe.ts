import { Pipe, PipeTransform } from '@angular/core';
import { StudentInterface } from './alumno.interface';

@Pipe({
    name: 'fullname'
})

export class FullnamePipe implements PipeTransform {
    transform(alumno: StudentInterface): string {
      return `${alumno.lastname} ${alumno.name}`;
    }
}