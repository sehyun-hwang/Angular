import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: "<router-outlet></router-outlet>",
})
export class AppComponent {
  Scopes=[...Array(10).keys()]
  Devices = [{
    EN: "humidifier",
    KR: "가습기" 
  }]

}