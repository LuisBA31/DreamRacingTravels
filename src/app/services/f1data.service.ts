import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class F1dataService {

  _url = '/api/f1/current.json';

  constructor(private http:HttpClient) { 

    console.log("Servicio F1");
  
  }

  getCurrentSeason(anio:any){

    if(anio == 1){
      let header = new HttpHeaders().set('Type-content','aplication/json');

      return this.http.get(this._url, {responseType: "text"});
    }else{
      this._url = '/api/f1/'+anio+'.json';

      let header = new HttpHeaders().set('Type-content','aplication/json');
  
      return this.http.get(this._url, {responseType: "text"});
    }

  }

}
