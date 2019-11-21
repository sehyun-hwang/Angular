import {Component } from '@angular/core';

import {FormControl} from '@angular/forms';
import {MatListModule} from '@angular/material/list';

import { SocketIO } from "./modules/socket.io"

@Component({
  selector: '',
  templateUrl: './PnID.component.html',
  styleUrls: ['./PnID.component.css'],
})
export class PnID {
  constructor(private socketIO: SocketIO) {}
  myControl = new FormControl();
  test() {
    
  }
}