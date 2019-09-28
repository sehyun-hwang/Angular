import {Component } from '@angular/core';

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

 typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}