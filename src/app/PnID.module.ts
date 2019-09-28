import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PnID, PnID_Dialog} from "./PnID.component";
import {PnID_Device} from "./PnID-Device.component";

const Components = [PnID, PnID_Device, PnID_Dialog];

@NgModule({
  imports: [
    CommonModule,
    ...Components
  ],
  declarations: Components,
  entryComponents: [PnID_Dialog]
})
export class PnID_Module { }