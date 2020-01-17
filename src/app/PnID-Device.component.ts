import {
  Component,
  Input,
  OnChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ChartOptions } from "chart.js";
import "chartjs-plugin-streaming";

import { IOInjectable } from "./PnID";
import { PnID_Dialog } from "./PnID-Dialog.component";
import { Realtime, XAxe } from "./PnID-Interfaces";
import { Influx } from "./PnID-Influx";

@Component({
  selector: "pnid-switch",
  templateUrl: "PnID-Switch.component.html"
})
export class PnID_Switch {
  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnChanges() {
    this.cdRef.detectChanges();
  }

  @Input() Click;
  @Input() Response;
  @Output() Request = new EventEmitter<boolean>();
}

@Component({
  selector: "pnid-device",
  templateUrl: "./PnID-Device.component.html"
})
export class PnID_Device {
  constructor(private dialog: MatDialog, private io: IOInjectable) {}
  Influx = new Influx(
    Time => `from(bucket: "test")
                  |> range(start: ${Time})`
  );

  @ViewChild("Switch", {
    static: false
  })
  Switch;

  @Input() Switches: boolean[];

  Expanded = true;

  Request(i: number, x: boolean) {
    console.log({ i, x });
    this.Switches[i] = x;
    this.io.emit("Switches", this.Switches);
  }

  Height = "100px";
  private _Dialog(event, Slider) {
    event.stopPropagation();
    event.preventDefault();

    this.dialog
      .open(PnID_Dialog)
      .afterClosed()
      .subscribe(result => {
        if (!result) return;

        Slider.checked ^= true as any;

        this.Request(0, Slider.checked);
        this.Switch.ngOnChanges();
      });
  }
  Dialog = this._Dialog.bind(this);

  options: ChartOptions = {
    scales: {
      xAxes: <XAxe[]>[
        {
          type: "realtime",
          realtime: {
            ttl: undefined,
            refresh: 1000,
            onRefresh: this.Influx.Refresh.bind(this.Influx)
          }
        }
      ]
    }
  };
}
