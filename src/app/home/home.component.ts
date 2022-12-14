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

  constructor(private f1dataService : F1dataService){

    this.f1dataService.getCurrentSeason(1).subscribe((resp:any) => {

      var resultado = JSON.parse(resp);

      const fecha = new Date();

      const mes = fecha.getMonth() + 1;

      // const mes = 5;

      var anioCarrera = 0;

      var mesCarrera = 0;

      var diaCarrera = 0;

      var aux = 0;

      var proxima = 0;

      var indiceCarrera = 0;

      // Se recorre todo el json y se almacena la información
      for (var i = 0; i < resultado.MRData.RaceTable.Races.length; i++){

        var fechaCarrera = new Date(resultado.MRData.RaceTable.Races[i].date).toISOString();

        anioCarrera = parseInt(fechaCarrera[0] + fechaCarrera[1] + fechaCarrera[2] + fechaCarrera[3]);
        mesCarrera = parseInt(fechaCarrera[5] + fechaCarrera[6]);
        diaCarrera = parseInt(fechaCarrera[8] + fechaCarrera[9]);

        if(mesCarrera >= mes){
          aux = mesCarrera;
          //console.log(mes);
          //console.log(mesCarrera);
          if (proxima < aux){
            proxima = aux;
            indiceCarrera = i;
            //console.log(indiceCarrera);
          }
        }

      }

      //console.log(indiceCarrera);
      //console.log(resultado.MRData.RaceTable.Races.length - indiceCarrera);

    if(resultado.MRData.RaceTable.Races.length - indiceCarrera != resultado.MRData.RaceTable.Races.length){

      for (var i = indiceCarrera; i< resultado.MRData.RaceTable.Races.length; i++){

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

    }else{

      this.carreras.push({
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
