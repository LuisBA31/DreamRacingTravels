import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  _url = '/api/f1/current.json';

  constructor(private http:HttpClient) { 

    console.log("Servicio Hoteles");
  
  }

  getHotelesPais(pais:any){

    //this._url = '/api/v2/lookup.json?query='+ pais +'&lookFor=both&limit=100&convertCase =0&token={{token}}'
    this._url = '/api/v2/lookup.json?query='+ pais +'&lookFor=both&limit=100&convertCase =0&token={{token}}'
      let header = new HttpHeaders().set('Type-content','aplication/json');
      return this.http.get(this._url, {responseType: "text"});
  }

}
