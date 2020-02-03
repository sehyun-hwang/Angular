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
  Tags: {
    TAG_NAME: string;
  }[];
  Status:string[];
  constructor(private io: IOInjectable) {
    console.time("Constructor");

    const Reduce = Key => (data: any[]): any =>
      data.reduce(
        (accum, cur) => {
          accum[cur[Key]] = cur;
          return accum;
        },
        {} as any
      );

    Promise.all([
      (fetch(
        "https://plantasset.kr/MPIS_WCF/webservice.asmx/TAG_SECH_LIST?area="
      ).then(Parser) as Promise<any>).then(Reduce("TAG_NAME")),

      new Promise(resolve => {
        function Resolve(data) {
          this.io.off("Init", resolve);
          resolve(data);
        }
        this.io.on("Init", Resolve);
      })
    ]).then(([data, { Status, Tags }]) => {
      Tags = Reduce("tag")(Tags);
      this.Status=  Status.map(x=>x[0]);

      for (let x in Tags) Object.assign(data[x], Tags[x]);
      this.Tags = Object.values(data).reduce((accum, cur) => {
        cur.TAG_NAME in data ? accum.unshift(cur) : accum.push(cur);
        return accum;
      }, []);
      console.log(this.Status)
      console.timeEnd("Constructor");
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
