import {Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: '',
  templateUrl: './Community.component.html',
  styleUrls: ['./Community.component.css'],
})
export class Community {
  Scopes = [...Array(7)].map((x,i)=>i+101);

  Form = {
    Mode:"User",
    dong: 101,
  };

  Devices = [{
    EN: "humidifier",
    KR: "가습기" 
  }, {
    EN: "light",
    KR: "무드등" 
  }];
}