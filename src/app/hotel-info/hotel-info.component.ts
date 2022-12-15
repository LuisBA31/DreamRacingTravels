import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.css']
})
export class HotelInfoComponent {

  // Array carrera
  carrera:Array<any> = [];

  // Array Hoteles
  hoteles:Array<any> = [];

  private carreraIndice:any = '';

  cadenaVerso = "";

  private pais = "";

  // Temporada actual
  temporada = "[Error en la fecha del sistema]";

  constructor(private _route: ActivatedRoute, private hotelService : HotelService){

    // Se obtiene el parámetro del id de la carrera

    this.carreraIndice = this._route.snapshot.paramMap.get('indice');
    var carreraIndice = parseInt(this.carreraIndice);

    // Obteniendo datos de los hoteles
    this.hotelService.getHotelesPais("France").subscribe((resp:any) => {

      var resultado = JSON.parse(resp);
      
      console.log(this.pais);
      console.log(resultado);

      // Obtenemos el pais
      for(var i = 0; i < resultado.results.hotels.length; i++){
        
        var pais = obtenerPais(resultado.results.hotels[i].locationName);
     
        var iataString = "";
        
        for(var i = 0; i < resultado.results.locations[0].iata.length ;i++){
          if(i == 0){
            iataString += resultado.results.locations[0].iata[i];
          }else{
              iataString += "," + resultado.results.locations[0].iata[i]; 
          }
        }
        
        if(pais = this.carrera[0].pais){

          //Aqui validamos que el hotel se encuentre en el mismo pais que el que se manda como parametro.
          this.hoteles.push({
            nombre: resultado.results.hotels[i].label,
            localizacion: resultado.results.hotels[i].locationName,
            criticas: resultado.results.hotels[i]._score,
            idpais: resultado.results.locations[i].countryCode,
            hoteles: resultado.results.locations[i].hotelsCount,
            iatas: iataString
          })

        }

      }
      
    })

    function obtenerPais(cadenaADividir:String): String {
      var arrayDeCadenas = cadenaADividir.split(",");
      return arrayDeCadenas[1].trim();
    }

  }

}
