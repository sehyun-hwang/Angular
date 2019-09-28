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
export class PnID_Dialog {}