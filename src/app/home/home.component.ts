import { Component } from '@angular/core';
import { F1dataService } from '../services/f1data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Array de objetos para carreras
  carreras:Array<any> = [];

  // Temporada actual
  temporada = "[Error en la fecha del sistema]";

  constructor(private f1dataService : F1dataService){

    this.f1dataService.getCurrentSeason(1).subscribe((resp:any) => {

      var resultado = JSON.parse(resp);

      const fecha = new Date();

      // const mes = fecha.getMonth() + 1;

      const mes = 8;

      var anioCarrera = 0;

      var mesCarrera = 0;

      var diaCarrera = 0;

      var band = false;

      var proxima = 0;

      this.temporada = resultado.MRData.RaceTable.Races[0].season;

      var indiceCarrera = 0;

      var indiceTemporada = 0;

      // Se recorre todo el json y se almacena la información
      for (var i = 0; i < resultado.MRData.RaceTable.Races.length; i++){

        var fechaCarrera = new Date(resultado.MRData.RaceTable.Races[i].date).toISOString();

        anioCarrera = parseInt(fechaCarrera[0] + fechaCarrera[1] + fechaCarrera[2] + fechaCarrera[3]);
        mesCarrera = parseInt(fechaCarrera[5] + fechaCarrera[6]);
        diaCarrera = parseInt(fechaCarrera[8] + fechaCarrera[9]);

        if(mesCarrera == mes){
          // console.log(mes);
          // console.log(mesCarrera);
          if (!band){
            indiceCarrera = i;
            console.log(indiceCarrera);
            band = true;
          }
        }

      }

      // console.log(indiceCarrera);
      // console.log(resultado.MRData.RaceTable.Races.length - indiceCarrera);
      indiceTemporada = resultado.MRData.RaceTable.Races.length - indiceCarrera;

      if(indiceTemporada != resultado.MRData.RaceTable.Races.length){

        for (var i = indiceCarrera; i< resultado.MRData.RaceTable.Races.length; i++){

          // Se almacenan los datos en el Array
          this.carreras.push({
            posicion: i,
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

      }else{

        this.carreras.push({
          posicion: 0,
          season: "",
          nombre: "No hay carreras próximas esta temporada",
          pais: "",
          estado: "",
          circuito: "Puedes consultar otras temporadas o carreras más específicas en la sección Search",
          info_circuito: "",
          fecha: "",
          hora: ""
        })

      }

    })

  }

}
