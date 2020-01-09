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

@Component({
  selector: "pnid-dialog",
  templateUrl: "PnID-Dialog.component.html"
})
export class PnID_Dialog {
  emailFormControl = new FormControl(
    "",
    Validators.required,
    async ({ value }) =>
      fetch("https://plantasset.kr/MPIS_WCF/webservice.asmx/LOGIN", {
        method: "POST",
        body: (function() {
          const Param = new URLSearchParams();
          JSON.parse(
            '["id","pwd","model","cordova","platform","uuid","version","manufacturer","isvirtual","serial","latitude","longitude","macaddress"]'
          ).forEach(x =>
            Param.append(
              x,
              {
                id: "mpis",
                pwd: value
              }[x] || null
            )
          );
          return Param;
        })()
      })
        .then(Parser)
        .then(data => ("STATUS" in data ? { error: "Wrong Password" } : null))
  );

  matcher = new MyErrorStateMatcher();
}

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

import { Parser, IOInjectable } from "./PnID";

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

interface Realtime {
  duration: number;
  ttl: number;
  delay: number;
  refresh: number;
  onRefresh: (ChartConfiguration) => void;
  frameRate: number;
  pause: boolean;
}

interface XAxe extends ChartXAxe {
  type: string;
  realtime: Realtime;
}

import { Client } from "@influxdata/influx";
import { Papa } from "ngx-papaparse";
//import { ChartsModule } from "ng2-charts";
import { ChartOptions, ChartXAxe } from "chart.js";
import "chartjs-plugin-streaming";

@Component({
  selector: "pnid-device",
  templateUrl: "./PnID-Device.component.html"
})
export class PnID_Device {
  io = this.IO.io;
  constructor(
    public dialog: MatDialog,
    private papa: Papa,
    private IO: IOInjectable
  ) {
  }

  @ViewChild("Switch", {
    static: false
  })
  Switch;
  Expanded =  true;

  Request(i: number, x: boolean) {
    console.log(i, x);
    const arr = [...this.Switches];
    arr[i] = x;
    this.io.emit("Switches", arr);
  }
  @Input() Switches;

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

  Influx = new Client(
    "https://us-west-2-1.aws.cloud2.influxdata.com/api/v2",
    "jUGziYHIueFTW-eqGJwfxvnwmXwRDsEd9fhCGLsm7VBS_m0OH2stYEsECQwo6J39-ZzwpgaPCSRtVvvWc0zU6w=="
  );

  datasets: any = [
    {
      fill: true,
      label: "Influx DB",
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    },
    {
      label: "Random",
      lineTension: 0,
      borderDash: [8, 4],
      data: [],
      hidden: true
    }
  ];

  Last = "-1m";
  Done = true;
  options: ChartOptions = {
    scales: {
      xAxes: <XAxe[]>[
        {
          type: "realtime",
          realtime: {
            ttl: undefined,
            refresh: 1000,
            onRefresh: chart => {
              chart.data.datasets[1].data.push({
                x: Date.now(),
                y: Math.random()
              });
              console.log(123)

              if (!this.Done) return;
              this.Done = false;

              this.Influx.queries
                .execute(
                  "44051e60e390121f",
                  `from(bucket: "test")
                  |> range(start: ${this.Last})`
                )
                .promise.then(
                  data =>
                    new Promise(resolve =>
                      this.papa.parse(data, {
                        complete: data => resolve({ data })
                      })
                    )
                )
                .then((data: string[][]) => {
                  console.log(data, this.Last, data.length);
                  if (data.length < 3) {
                    this.Done = true;
                    return;
                  }

                  const [Value_i, Time_i] = ["temp", "time"].map(key =>
                    data[3].findIndex(x => x.indexOf(key) > 0)
                  );

                  const date = new Date(data[data.length - 3][Time_i]);
                  date.setSeconds(date.getSeconds() + 1);
                  this.Last = date.toISOString();

                  for (const x of data)
                    chart.data.datasets[0].data.push({
                      x: x[Time_i],
                      y: x[Value_i]
                    });

                  chart.update({
                    preservation: true
                  });
                  this.Done = true;
                })
                .catch(console.warn);
            }
          }
        }
      ]
    }
  };
}
