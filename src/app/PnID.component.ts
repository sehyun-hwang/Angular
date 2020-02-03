import { Component, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IOInjectable, Timestamp, Parser, StatusInterface } from "./PnID";

@Component({
  selector: "",
  templateUrl: "./PnID.component.html",
  styleUrls: ["./PnID.component.css"],
  providers: [IOInjectable]
})
export class PnID {
  Log = console.log;
  table: Object;
  displayedColumns: string[] = ["time", "event"];
  Timestamp = Timestamp;

  Switches: boolean[];
  Tags: {
    TAG_NAME: string;
  }[];
  Status: StatusInterface;
  get StatusArray() {
    return Object.keys(this.Status);
  }
  StatusToggle(Tag) {
    this.Status[Tag] ^= 1;
    console.log(this.Status);
  }

  constructor(private io: IOInjectable) {
    console.time("Constructor");

let First;
    const Once = ()=>new Promise(resolve => {
      function Resolve(data) {
        this.io.off(resolve);
        First = data;
        resolve(data);
      }
      this.io.on("Init", Resolve);
    });
    const Fetch = fetch(
      "https://plantasset.kr/MPIS_WCF/webservice.asmx/TAG_SECH_LIST?area="
    ),
    const Promises = [Once(), Fetch];
    Promise.race(Promises).then(async data=>data instanceof Response? 
    {  data, ...(await Promises[0]) } :
      Promise.race([Once(), Fetch]).then(data=>data instanceof Response? 
      {data, ...First}: data
      ))
    .then(async ({ data, Status, Tags }) => {
        this.Status = Status.reduce(
          (accum, cur) => {
            accum[cur[0].trim()] = 1;
            return accum;
          },
          {} as StatusInterface
        );

        return {
          Tags: Tags.map(x=>x[0]),
          data: await Parser(data)
        };
      })
      .then(({ data, Tags }) => {
        this.Tags = data.reduce((accum, cur) => {
          Tags.includes(cur.TAG_NAME)  ? accum.unshift(cur) : accum.push(cur);
          return accum;
        }, []);
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
