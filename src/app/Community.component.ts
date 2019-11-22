import {Component } from '@angular/core';

@Component({
  selector: '',
  templateUrl: './Community.component.html',
  //styleUrls: ['./Community.component.css'],
})
export class Community {
  Scopes = [...Array(10).keys()];
}