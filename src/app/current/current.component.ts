import { Component } from '@angular/core';
import { F1dataService } from '../services/f1data.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent {

  // Array de objetos para carreras
  carreras:Array<any> = [];

  constructor(private f1dataService : F1dataService){

    this.f1dataService.getCurrentSeason(1).subscribe((resp:any) => {

      var resultado = JSON.parse(resp);

      // Se recorre todo el json y se almacena la información
      for (var i = 0; i < resultado.MRData.RaceTable.Races.length; i++){

        // Se almacenan los datos en el Array
        this.carreras.push({
          season: resultado.MRData.RaceTable.Races[i].season,
          nombre: resultado.MRData.RaceTable.Races[i].raceName,
          pais: resultado.MRData.RaceTable.Races[i].Circuit.Location.country,
          estado: resultado.MRData.RaceTable.Races[i].Circuit.Location.locality,
          circuito: resultado.MRData.RaceTable.Races[i].Circuit.circuitName,
          info_circuito: resultado.MRData.RaceTable.Races[i].Circuit.url,
          fecha: resultado.MRData.RaceTable.Races[i].date,
          hora: resultado.MRData.RaceTable.Races[i].time
        })

      }

      console.log(this.carreras);

    })

  }

}
