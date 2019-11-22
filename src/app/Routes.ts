import { Routes } from '@angular/router';
import {Index} from "./index.component"

import { TeachersDay } from './TeachersDay.component';
import { StreetCapture } from './StreetCapture.component';
import { PnID } from './PnID.component';
import { Community } from './Community.component';

export const routes: Routes  = [
  { path: '', component: Index },
  { path: 'Angualr', component: Index },
  { path: "community", component: Community },
  { path: 'teachersday/console.html', component: TeachersDay },
  { path: 'ptais/street-capture.html', component: StreetCapture },
  { path: 'pnid', component: PnID },
  { path: '**', component: PnID},
]