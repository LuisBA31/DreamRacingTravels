import { Component} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { F1dataService } from '../services/f1data.service';

@Component({
  selector: 'app-race-info',
  templateUrl: './race-info.component.html',
  styleUrls: ['./race-info.component.css']
})
export class RaceInfoComponent {

  // Array carrera
  carrera:Array<any> = [];

  // Array Hoteles
  hoteles:Array<any> = [];

  private carreraIndice:any = '';

  cadenaVerso = "";

  private pais = "";

  // Temporada actual
  temporada = "[Error en la fecha del sistema]";

  constructor(private _route: ActivatedRoute, private f1dataService : F1dataService){

    // Se obtiene el parámetro del id de la carrera

    this.carreraIndice = this._route.snapshot.paramMap.get('indice');
    var carreraIndice = parseInt(this.carreraIndice);

    // Obteniendo datos de la carrera

    this.f1dataService.getCurrentSeason(1).subscribe((resp:any) => {

      var resultado = JSON.parse(resp);

      // Se almacena la información de la carrera

      // Se almacenan los datos en el Array
      this.carrera.push({
        season: resultado.MRData.RaceTable.Races[carreraIndice].season,
        nombre: resultado.MRData.RaceTable.Races[carreraIndice].raceName,
        pais: resultado.MRData.RaceTable.Races[carreraIndice].Circuit.Location.country,
        estado: resultado.MRData.RaceTable.Races[carreraIndice].Circuit.Location.locality,
        circuito: resultado.MRData.RaceTable.Races[carreraIndice].Circuit.circuitName,
        info_circuito: resultado.MRData.RaceTable.Races[carreraIndice].Circuit.url,
        fecha: resultado.MRData.RaceTable.Races[carreraIndice].date,
        hora: resultado.MRData.RaceTable.Races[carreraIndice].time
      })

      this.temporada = this.carrera[0].season;

      this.pais = this.carrera[0].pais

    })

  }

}
