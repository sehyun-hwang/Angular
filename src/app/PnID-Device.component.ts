import {Component } from '@angular/core';

@Component({
  selector: 'pnid-device',
  templateUrl: './PnID-Device.component.html',
  styles: []
})
export class PnID_Device {
  StopPropagation(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}