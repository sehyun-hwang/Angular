import { Component, Inject } from "@angular/core";

import { FormControl } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { IOInjectable, Timestamp } from "./PnID";

@Component({
  selector: "",
  templateUrl: "./PnID.component.html",
  styleUrls: ["./PnID.component.css"],
})
export class PnID {
  table: Object;
  displayedColumns: string[] = ["time", "event"];

  Timestamp = Timestamp;
  io = this.IO.io
  constructor(private IO:IOInjectable) {
    this.io.on("AngularTable", data => this.table = data);
    this.io.on("Switches", data=> {
      console.log(data)
      this.Switches = data
    });
  }
  myControl = new FormControl();

  Switches:boolean[];

  test() {
    this.io.emit("Ping");
  }
}
