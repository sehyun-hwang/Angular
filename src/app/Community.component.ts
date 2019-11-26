import {Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: '',
  templateUrl: './Community.component.html',
  styleUrls: ['./Community.component.css'],
})
export class Community {
  Form_Initial = {
    dong: [...Array(7)].map((x,i)=>i+101),
    floor: (()=>{
      const arr = [...Array(10)];
      arr.pop();
      return arr;
    })()
  };

  Form = {
    Mode:"User",
    dong: 101,
    floor: 1,
  };


  Devices = [{
    EN: "humidifier",
    KR: "가습기" 
  }, {
    EN: "light",
    KR: "무드등" 
  }];
}