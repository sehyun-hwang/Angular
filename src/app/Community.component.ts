import {Component } from '@angular/core';

@Component({
  selector: '',
  templateUrl: './Community.component.html',
  styleUrls: ['./Community.component.css'],
})
export class Community {
  Scopes = [...Array(10).keys()];
  Devices = [{
    EN: "humidifier",
    KR: "가습기" 
  }, {
    EN: "light",
    KR: "무드등" 
  }];
}