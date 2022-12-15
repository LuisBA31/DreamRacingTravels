import { Component} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent{

  // Array Hoteles
  hoteles:Array<any> = [];

  public nombreCarrera:any = '';
  public estadoCarrera:any = '';
  public paisCarrera:any = '';
  public circuitoCarrera:any = '';
  public infoCircuito:any = '';
  public fechaCarrera:any = '';
  public horaCarrera:any = '';

  cadenaVerso = "";

  private pais = "";

  constructor(private _route: ActivatedRoute, private hotelService : HotelService){

    // Se obtiene el parámetro del id de la carrera

    this.nombreCarrera = this._route.snapshot.paramMap.get('nom');
    this.estadoCarrera = this._route.snapshot.paramMap.get('pais');
    this.paisCarrera = this._route.snapshot.paramMap.get('loc');
    this.circuitoCarrera = this._route.snapshot.paramMap.get('carrera');
    this.infoCircuito = this._route.snapshot.paramMap.get('info');
    this.fechaCarrera = this._route.snapshot.paramMap.get('fecha');
    this.horaCarrera = this._route.snapshot.paramMap.get('hora');

    console.log(this.nombreCarrera);

    // Obteniendo datos de los hoteles
    this.hotelService.getHotelesPais("France").subscribe((resp:any) => {

      var resultado = JSON.parse(resp);
      
      console.log("El pais es: " + this.pais);
      
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
        
        if(pais = this.pais){

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
