import {Component, Input } from '@angular/core';
import {MatDialog, MatDialogTitle, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Client } from '@influxdata/influx';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-streaming';

@Component({
  selector: 'pnid-device',
  templateUrl: './PnID-Device.component.html',
})
export class PnID_Device {
  constructor(public dialog: MatDialog) {}
  @Input() i;

  checked:boolean;
  Height = '100px';
  openDialog(event) {
    event.stopPropagation();
    event.preventDefault();

    this.dialog.open(PnID_Dialog)
    .afterClosed().subscribe(result => {
      //@ts-ignore
      this.checked ^= true;
    });
  };

  Influx = new Client("https://us-west-2-1.aws.cloud2.influxdata.com/api/v2","jUGziYHIueFTW-eqGJwfxvnwmXwRDsEd9fhCGLsm7VBS_m0OH2stYEsECQwo6J39-ZzwpgaPCSRtVvvWc0zU6w==").queries.execute;

  datasets: any[] = [{
    label: 'Dataset 1',
    lineTension: 0,
    borderDash: [8, 4],
    data: []
  }];

  options:any= {
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          onRefresh: chart => {
            console.log(this.Influx)
            const { promise, cancel } = this.Influx('44051e60e390121f',
            `from(bucket: "test")
            |> range(start: -72h)`);
            promise.then(console.log).catch(console.warn)
            chart.data.datasets.forEach(dataset=>{
              dataset.data.push({
                  x: Date.now(),
                  y: Math.random()
              });
            })
          },
          refresh: 20000,
        }
      }]
    }
  }
}

@Component({
  selector: 'pnid-dialog',
  templateUrl: "PnID-Dialog.component.html",
})
export class PnID_Dialog {
  @Input() LOTO;

  emailFormControl = new FormControl('',
    Validators.required,
    data=>new Promise(resolve=>fetch("https://plantasset.kr/MPIS_WCF/webservice.asmx/LOGIN", {
      method: "POST",
      body: (function(){
        const Param = new URLSearchParams();
        ["id", "pwd", "model", "cordova", "platform", "uuid", "version", "manufacturer", "isvirtual", "serial", "latitude", "longitude", "macaddress"]
        .forEach(x=>Param.append(x, {
          id: "mpis",
          pwd: data.value,
        }[x] || null));
        return Param;
      })()
    }).then(res=>res.text())
    .then(text=>new DOMParser().parseFromString(text, "text/xml").firstElementChild.innerHTML)
    .then(JSON.parse)
    .then(({Table})=>{
      resolve(Table[0].STATUS !== "false"? null: {error: "Wrong Password"})
    })
  ));

  matcher = new MyErrorStateMatcher();
}

import {FormControl, FormGroupDirective, NgForm, Validators, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

