import { Component } from '@angular/core';
import { F1dataService } from './services/f1data.service';
import { HotelService } from './services/hotel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DreamRacingTravels';

  constructor(private hotelService : HotelService){

    /*this.hotelService.getHotelesPais("Mexico").subscribe((resp:any) => {

      var resultado = JSON.parse(resp);
      console.log(resultado.results.hotels[0].fullName);
      
    })*/

  }
}
