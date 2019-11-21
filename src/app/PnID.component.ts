import {Component } from '@angular/core';

import {FormControl} from '@angular/forms';
import {MatListModule} from '@angular/material/list';

import { SocketIO } from "./modules/socket.io"
import { Observable, Subject } from 'rxjs';

@Component({
  selector: '',
  templateUrl: './PnID.component.html',
  styleUrls: ['./PnID.component.css'],
})
export class PnID {
  messages: Subject<any>;
  constructor(private socketIO: SocketIO) {
     this.messages = <Subject<any>>this.socketIO.connect();
  }
  myControl = new FormControl();
  test() {
    this.messages.next("message");
  }
}