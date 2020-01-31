import { Component, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IOInjectable, Timestamp, Parser } from "./PnID";

@Component({
  selector: "",
  templateUrl: "./PnID.component.html",
  styleUrls: ["./PnID.component.css"],
  providers: [IOInjectable]
})
export class PnID {
  table: Object;
  displayedColumns: string[] = ["time", "event"];
  Timestamp = Timestamp;

  Switches: boolean[];
  Tags: string[][];
  constructor(private io: IOInjectable) {
    Promise.all([
      new Promise(resolve => {
        function Resolve(data) {
          resolve(data);
          this.io.off("Tags", resolve);
        }
        this.io.on("Tags", Resolve);
      }),
      fetch(
        "https://plantasset.kr/MPIS_WCF/webservice.asmx/TAG_SECH_LIST?area="
      )
        .then(Parser)
        .then((data: any[]) =>
          data.reduce((accum: an, cur) => {
            accum[cur["TAG_NAME"]] = cur;
            return accum;
          }, {})
        )
    ]).then(data => {
      console.log(data);
    });
    this.io.on("AngularTable", data => (this.table = data));
    this.io.on("Switches", data => (this.Switches = data));
  }

  myControl = new FormControl();
  test() {
    this.io.emit("Ping");
  }

  ngOnDestroy() {
    this.io.close();
  }
}
