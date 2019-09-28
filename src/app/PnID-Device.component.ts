import {Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'pnid-device',
  templateUrl: './PnID-Device.component.html',
  styles: []
})
export class PnID_Device {
  constructor(public dialog: MatDialog) {}

  openDialog(event) {
    event.stopPropagation();
    event.preventDefault();

    const dialogRef = this.dialog.open(PnID_Dialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'pnid-dialog',
  templateUrl: "PnID-Dialog.component.html",
})
export class PnID_Dialog {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}