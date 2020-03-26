import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import _ from "lodash";

import { IOInjectable, Timestamp, Parser } from "./PnID";
import { StatusInterface } from "./PnID-Interfaces";

@Component({
  selector: "",
  templateUrl: "./PnID.component.html",
  styleUrls: ["./PnID.component.css"],
  providers: [IOInjectable]
})
export class PnID implements AfterViewInit {
  @ViewChild("auto") TagElement;

  Log = console.log;
  Table: Object;
  displayedColumns: string[] = ["time", "event"];
  Timestamp = Timestamp;

  List:[[number, string]] = [];
  ListItem = 10;

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
      new Promise(resolve =>
        this.io.once("Init", data => resolve([data, Once()]))
      );
    const once = Once();
    const Fetch = fetch(
      "https://plantasset.kr/MPIS_WCF/webservice.asmx/TAG_SECH_LIST?area="
    );
    Promise.race([
      Promise.all([
        once.then(data => data[0]),
        Fetch.catch()
      ]),
      once.then(async ([data, promise]) => 
        Promise.all([data, promise]))
    ])
      //.then(console.log)
      .then(data=>data.flat())
      .then(
        async ([Status, Tags, data]: [
          string[],
          {
            device: string;
            tag: string;
          }[],
          any
        ]) => {
          console.log({Status, Tags, data});
          this.Status = Status.reduce(
            (accum, cur) => {
              accum[cur.trim()] = 1;
              return accum;
            },
            {} as StatusInterface
          );

          return {
            Tags,
            data: await Parser(data)
          };
        }
      )
      .then(({ Tags, data }) => {
        const Tags_arr = Tags.map(x => x.tag);

        this.Tags = data.reduce((accum, cur) => {
          let Index = Tags_arr.indexOf(cur.TAG_NAME);
          if (Index > -1) {
            cur.device = Tags[Index].device;
            accum.unshift(cur);
          } else accum.push(cur);
          return accum;
        }, []);

        this.TagControl.setValue(
          localStorage.getItem("Tag") || this.Tags[0].TAG_NAME
        );

        console.timeEnd("Constructor");
      });

    this.io.on("Tables", data => {
      let Table;
      [this.List, Table] = data
      console.log(Table);
      const arr = JSON.parse('["unlock_requester", "unlock_checker", "lock_requester"]');
      console.log(arr);
    Table.forEach(x=>{
      cosnt [Event, Person]=Object.entries(_.pickBy(_.pick(x, arr), x=>x));
      Object.assign(Table, {Event, Person});
      })
      });
    this.io.on("Switches", data => (this.Switches = data));
  }

  ngAfterViewInit() {
    this.TagControl.valueChanges.subscribe(value => this.io.emit("Tag", value));
  }

  TagControl = new FormControl();
  test() {
    this.io.emit("Ping");
  }

  ngOnDestroy() {
    this.io.close();
  }
}
