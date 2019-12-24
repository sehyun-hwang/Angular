import { Component } from "@angular/core";

import { FormControl } from "@angular/forms";
import { MatListModule } from "@angular/material/list";

import IO from "socket.io-client";
import { Timestamp } from "./PnID";

@Component({
  selector: "",
  templateUrl: "./PnID.component.html",
  styleUrls: ["./PnID.component.css"]
})
export class PnID {
  table: Object;
  displayedColumns: string[] = ["time", "event"];

  io;
  Timestamp = Timestamp;
  constructor() {
    this.io = IO("https://proxy.hwangsehyun.ga?port=8081");
    this.io.on("AngularTable", data =>this.table = data);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(data => data.json())
      .then(data => (this.table = data));
  }
  myControl = new FormControl();
  test() {
    this.io.emit("Ping");
  }
}
