import {Component, ViewEncapsulation, Input} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: '',
  templateUrl: './PnID.component.html',
  styleUrls: ['./PnID.component.css'],
})
export class PnID {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
constructor(public dialog: MatDialog) {}

 typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  openDialog() {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  @Input('aria-label')
  ariaLabel: string = "12321";  
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: "PnID-Dialog.component.html",
})
export class DialogContent {}