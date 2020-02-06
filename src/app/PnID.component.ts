import { Component, OnDestroy, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IOInjectable, Timestamp, Parser, StatusInterface } from "./PnID";

@Component({
  selector: "",
  templateUrl: "./PnID.component.html",
  styleUrls: ["./PnID.component.css"],
  providers: [IOInjectable]
})
export class PnID implements AfterViewInit {
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

    const Once = () =>
      new Promise(resolve => {
        function Resolve(data) {
          this.io.off(resolve);
          resolve(data);
        }
        this.io.on("Init", Resolve);
      });
    const Promises = [
      Once(),
      fetch(
        "https://plantasset.kr/MPIS_WCF/webservice.asmx/TAG_SECH_LIST?area="
      )
    ];
    Promise.race([
      Promise.all(Promises),
      Promises[0].then(async data =>
        Promise.race([Once(), Promises[1]]).then(data2 =>
          data2 instanceof Response ? [data, data2] : [data, data[2]]
        )
      )
    ]) //.then(console.log)
      .then(
        async ([[Status, Tags], data]: [
          [
            string[],
            {
              device: string;
              tag: string;
            }[]
          ],
          { TAG_NAME: string }
        ]) => {
          console.log(Status, Tags, data);
          this.Status = Status.reduce(
            (accum, cur) => {
              accum[cur.trim()] = 1;
              return accum;
            },
            {} as StatusInterface
          );

          return {
            Tags: Tags.map(x => x.tag),
            data: await Parser(data)
          };
        }
      )
      .then(({ data, Tags }) => {
        console.log(Tags);
        this.Tags = data.reduce((accum, cur) => {
          Tags.includes(cur.TAG_NAME) ? accum.unshift(cur) : accum.push(cur);
          return accum;
        }, []);
        console.timeEnd("Constructor");
      });
    this.io.on("AngularTable", data => (this.table = data));
    this.io.on("Switches", data => (this.Switches = data));
  }

  ngAfterViewInit() {
    
  }

  myControl = new FormControl();
  test() {
    this.io.emit("Ping");
  }

  ngOnDestroy() {
    this.io.close();
  }
}
