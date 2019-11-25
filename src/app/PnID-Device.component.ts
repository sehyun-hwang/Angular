import { Component, Input } from "@angular/core";
import {
  MatDialog,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

import { Client } from "@influxdata/influx";
import { Papa } from "ngx-papaparse";
import { ChartsModule } from "ng2-charts";
import "chartjs-plugin-streaming";

import { Parser } from "./PnID-PlantAsset.component";

@Component({
  selector: "pnid-device",
  templateUrl: "./PnID-Device.component.html"
})
export class PnID_Device {
  constructor(public dialog: MatDialog, private papa: Papa) {}
  @Input() i;

  checked: boolean;
  Height = "100px";
  openDialog(event) {
    event.stopPropagation();
    event.preventDefault();

    this.dialog
      .open(PnID_Dialog)
      .afterClosed()
      .subscribe(result => {
        //@ts-ignore
        this.checked ^= true;
      });
  }

  Influx = new Client(
    "https://us-west-2-1.aws.cloud2.influxdata.com/api/v2",
    "jUGziYHIueFTW-eqGJwfxvnwmXwRDsEd9fhCGLsm7VBS_m0OH2stYEsECQwo6J39-ZzwpgaPCSRtVvvWc0zU6w=="
  );

  datasets: any[] = [
    {
      label: "Influx DB",
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    },
    {
      label: "Random",
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }
  ];

  Last = "-1m";
  Done = true;
  options: any = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: chart => {
              chart.data.datasets[1].data.push({
                x: Date.now(),
                y: Math.random()
              });

              if (!this.Done) return;
              this.Done = false;

              this.Influx.queries
                .execute(
                  "44051e60e390121f",
                  `from(bucket: "test")
            |> range(start: ${this.Last})`
                )
                .promise.then(data => {
                  this.papa.parse(data, {
                    complete: ({ data }) => {
                      console.log(this.Last, data.length);
                      if (data.length < 3) {
                        this.Done = true;
                        return;
                      }
                      function FindIndex(Key) {
                        return data[3].findIndex(x => x.indexOf(Key) > 0);
                      }
                      const Value_i = FindIndex("value");
                      const Time_i = FindIndex("time");

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
                    }
                  });
                })
                .catch(console.warn);
            },
            refresh: 1000
          }
        }
      ]
    }
  };
}

@Component({
  selector: "pnid-dialog",
  templateUrl: "PnID-Dialog.component.html"
})
export class PnID_Dialog {
  @Input() LOTO;

  emailFormControl = new FormControl("", Validators.required, async data =>
    fetch("https://plantasset.kr/MPIS_WCF/webservice.asmx/LOGIN", {
      method: "POST",
      body: (function() {
        const Param = new URLSearchParams();
        [
          "id",
          "pwd",
          "model",
          "cordova",
          "platform",
          "uuid",
          "version",
          "manufacturer",
          "isvirtual",
          "serial",
          "latitude",
          "longitude",
          "macaddress"
        ].forEach(x =>
          Param.append(
            x,
            {
              id: "mpis",
              pwd: data.value
            }[x] || null
          )
        );
        return Param;
      })()
    })
      .then(Parser)
      .then(data =>
        data.STATUS !== "false" ? null : { error: "Wrong Password" }
      )
  );

  matcher = new MyErrorStateMatcher();
}

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  AsyncValidatorFn,
  ValidationErrors
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
