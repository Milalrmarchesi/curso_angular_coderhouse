import { Injectable } from '@angular/core';
import { of, interval, Observable, from } from 'rxjs';
import { mergeMap, map, filter, delay, toArray, take} from 'rxjs/operators';
import { ClasesInterface } from '../interfaces/clases.interface';


@Injectable({
  providedIn: 'root'
})

export class ClasesService {
  clases: ClasesInterface[] = [
      {id: 0, subject: 'Algebra I', teacher: "Marchesi", schedule: '10:00 - 12:00', enabled: true},
      {id: 1, subject: 'Analisis matemático', teacher: "Marchesi", schedule: '10:00 - 12:00', enabled: true},
      {id: 2, subject: 'Algebra I', teacher: "Fernandez", schedule: '12:00 - 14:00', enabled: true},
      {id: 3, subject: 'Algebra II', teacher: "Etcheverry", schedule: '07:00 - 12:00', enabled: true},
      {id: 4, subject: 'Física', teacher: "Saenz", schedule: '08:00 - 11:00', enabled: true},
      {id: 5, subject: 'Quimica', teacher: "Calo", schedule: '14:00 - 16:00', enabled: true},
      {id: 6, subject: 'Arquitectura de computadoras', teacher: "Marchesi", schedule: '16:00 - 18:00', enabled: true},
      {id: 7, subject: 'Sistemas operativos', teacher: "Etcheverry", schedule: '18:00 - 20:00', enabled: true},
      {id: 8, subject: 'Mecanica', teacher: "Camoranesi", schedule: '20:00 - 21:00', enabled: true},
      {id: 9, subject: 'Física II', teacher: "Cavani", schedule: '20:00 - 22:00', enabled: true},
  ]
  current!: ClasesInterface;
  constructor() { }



  getData(): Observable<ClasesInterface[]> {
    return from(this.clases).pipe(
      filter((clase) => !!clase && clase.enabled),
      map((clase) => {
        clase.subject = clase.subject.toUpperCase();
        return clase;
      }),
      delay(3000),
      toArray()
    );
  }

  getClasesById(id: number): Promise<ClasesInterface | null> {
    const clase = this.clases.find((clase) => clase.id === id);
    return Promise.resolve(clase || null);
  }

  getNewClaseId(){
    let max_value = 0;
    for (let clase of this.clases) {
      if (clase.id > max_value) {
        max_value = clase.id;
      }
    }
    return max_value + 1;
  }

  addNewClase(clase: ClasesInterface){
    this.clases.push(clase);
  }

  deleteClase(clase_id: number){
    this.clases = this.clases.filter((clase) => clase.id != clase_id);
  }

  saveEditedClase(clase: ClasesInterface){
    for(let i=0; i<=this.clases.length; i++){
      if(this.clases[i].id === clase.id){
        this.clases[i] = clase;
        break;
      }
    }
  }

}
