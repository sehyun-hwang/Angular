import { Component, ViewEncapsulation, ViewChild, NgZone } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: '',
  styleUrls: ['TeachersDay.component.css'],
  templateUrl: 'TeachersDay.component.html',
  encapsulation: ViewEncapsulation.None
})

export class TeachersDay {
 constructor(private zone: NgZone) {
    //@ts-ignore
    window.ng.Component = {
      _this: this,
      Zone: this.zone,
      Property: (...args) => {
        if (args[1])
          return this[args[0]] = args[1];
        return this[args[0]];
      },
      Method: (Name, args) => this.this_Method(Name, args),
    };
  }
  this_Method(Name, args) {
    return this[`${Name}`](args);
  };

  Instructions = "Instructions";

  @ViewChild('countdown', {static: true}) counter: CountdownComponent;

  displayedColumns = ["Rank", "Prize", "Name", "Hash", "Remove"];
  dataSource = new MatTableDataSource();
  @ViewChild('MatSort', {static: true}) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(Table => {
      var Names = Table.map((Row: Row) => Row.Name)
      this.dataSource.data.forEach((Row: Row) => {

        var Index = Names.indexOf(Row.Name);
        Row.Prize = Prizes[Index] ? Prizes[Index] : '🤪 Null Ref Error';
        Row.Rank = Index + 1;
        console.log(this.dataSource.data);
      });
    });
  }

  Finished_Event = new Event('Finished');
  Countdown: Countdown_Interface = {
    _this: this,
    Status: "",
    Event: function (Event) {
      this.Status = Event.action;
      switch (this.Status) {
        case "start":
          this._this.Sort("Hash");
          break;
        case "finished":
          this._this.Sort("Hash");
          this._this.Sort("Hash");
          window.dispatchEvent(this._this.Finished_Event);
          break;
      }
    }
  }

  Rank = 1;
  Sort(id: keyof Row) {
    this.dataSource.sort.sort({
      id: id,
      start: id === "Rank" ? "asc" : "desc",
      disableClear: true
    });
  }

  Add(Row: Row) {
    if (this.Countdown.Status !== "") return;
    var TableLength = this.dataSource.data.push(Object.assign(Row ? Row : {}, { Rank: this.Rank }));
    this.Rank++;
    this.dataSource._updateChangeSubscription();
    return TableLength;
  }

 Update_Last = Date.now();
  Updates = 0
  Update(Data: Row) {
    if (this.Countdown.Status !== "start") return;

    this.Updates += 1;
    this.dataSource.data[
      this.dataSource.data.findIndex(Row => Row["Name"] === Data.Name)
    ]["Hash"] = Data.Hash;

    if (Date.now() - this.Update_Last < 500) return;
    this.Update_Last = Date.now();
    this.Sort("Hash");
    this.Sort("Hash");
  }

  Remove(Name) {
    this.dataSource.data.splice(
      this.dataSource.data.findIndex(Row => Row["Name"] === Name), 1);
    this.dataSource._updateChangeSubscription();
  }
}

const Prizes = ["Google Home Mini",
  "Bluetooth Keyboard",
  "Tea Set", "Tea Set",
  "Hand-held Fan", "Hand-held Fan"]
  .concat(Array(8).fill("Milk Thistle"));

interface Countdown_Interface {
  _this: any;
  Status: string;
  Event(Event): void;
}

export interface Row {
  Rank?: number;
  Name: string;
  Hash?: string;
  Prize?: string
}