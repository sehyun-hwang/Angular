import { Component } from "@angular/core";

import { FormControl } from "@angular/forms";
import { MatListModule } from "@angular/material/list";

import { SocketIO } from "./modules/socket.io";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "",
  templateUrl: "./PnID.component.html",
  styleUrls: ["./PnID.component.css"]
})
export class PnID {
  table: Object;
  displayedColumns: string[] = ['id', 'name'];
  messages: Subject<any>;
  constructor(private socketIO: SocketIO) {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(data => data.json())
      .then(data => this.table = data)
      .then(console.log);
    this.messages = <Subject<any>>this.socketIO.connect();
  }
  myControl = new FormControl();
  test() {
    this.messages.next("message");
  }
}
