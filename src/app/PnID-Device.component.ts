import {Component, Input } from '@angular/core';
import {MatDialog, MatDialogTitle, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';

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
  }

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
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
      resolve(Table[0].STATUS == "false"? null: {error: "Wrong Password"})
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

