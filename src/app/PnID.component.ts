import {Component } from '@angular/core';

import {FormControl} from '@angular/forms';
import {MatListModule} from '@angular/material/list';

import { Client } from '@influxdata/influx';

@Component({
  selector: '',
  templateUrl: './PnID.component.html',
  styleUrls: ['./PnID.component.css'],
})
export class PnID {
  myControl = new FormControl();

InfluxClient = new Client("https://us-west-2-1.aws.cloud2.influxdata.com/api/v2/write","jUGziYHIueFTW-eqGJwfxvnwmXwRDsEd9fhCGLsm7VBS_m0OH2stYEsECQwo6J39-ZzwpgaPCSRtVvvWc0zU6w==")

test() {
  const {promise, cancel} = this.InfluxClient.queries.execute('44051e60e390121f',
  'from(bucket: "test") |> range(start: -100000h)')

  promise.then(console.log)
}

}