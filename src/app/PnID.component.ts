import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: '',
  templateUrl: './PnID.component.html',
  styleUrls: ['./PnID.component.css']
})
export class PnID {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
}