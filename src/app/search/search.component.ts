import { Component } from '@angular/core';
import { F1dataService } from '../services/f1data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  // Temporada a buscar
  temporada = 2022;

  // Bandera de búsqueda
  busqueda = false;

  // Array de objetos para carreras
  carreras:Array<any> = [];

  constructor(private f1dataService : F1dataService){

    this.actualizarTabla(this.temporada);

  }

  actualizarTabla(season: number){

    console.log(season);

    this.f1dataService.getCurrentSeason(season).subscribe((resp:any) => {

      while(this.carreras.length > 0){
        this.carreras.pop();
      }

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
    })
  }

}
