import { Component } from '@angular/core';
import { F1dataService } from './services/f1data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DreamRacingTravels';

  carreras:Array<any> = [];

  constructor(private f1dataService : F1dataService){

    this.f1dataService.getCurrentSeason(1).subscribe((resp:any) => {

      var resultado = JSON.parse(resp);
      const fecha = new Date();
      const anio = fecha.getFullYear();
      const mes = fecha.getMonth() + 1;
      const dia = fecha.getDay();

      var anioCarrera = 0;
      var mesCarrera = 0;
      var diaCarrera = 0;
      var aux = 0;
      var proxima = 12;
      var indiceCarrera = 0;

      for (var i = 0; i < resultado.MRData.RaceTable.Races.length; i++) {

        console.log("La fecha de la carrera es: "+ resultado.MRData.RaceTable.Races[0].date);
        var fechaCarrera = new Date(resultado.MRData.RaceTable.Races[i].date).toISOString();
        anioCarrera = parseInt(fechaCarrera[0] + fechaCarrera[1] + fechaCarrera[2] + fechaCarrera[3]);
        mesCarrera = parseInt(fechaCarrera[5] + fechaCarrera[6]);
        diaCarrera = parseInt(fechaCarrera[8] + fechaCarrera[9]);

        if(mesCarrera >= mes && mesCarrera <= 12 ){
          aux = mesCarrera;
          if (proxima < aux){
            proxima = aux;
            indiceCarrera = i;
          }
        }
        
      }
      
    })

    /*const fecha = new Date();
    const anio = fecha.getFullYear() + 1;

    this.f1dataService.getOtherSeason(anio).subscribe((resp:any) => {

      var resultado = JSON.parse(resp);

      for (var i = 0; i < resultado.MRData.RaceTable.Races.length; i++) {

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

        console.log(this.carreras[i]);
        
      }

      
    })*/

  }
}
