import { AppComponent } from "./app.routing.component";
import { Index } from "./app.routing.component";
import { TeachersDay } from "./TeachersDay.component";
import { StreetCapture } from "./StreetCapture.component";
import { PnID } from "./PnID.component";
import { PnID_Device, PnID_Dialog } from "./PnID-Device.component";
import { Community } from "./Community.component";

import { Routes } from "@angular/router";
export { AppComponent, PnID_Dialog };

export const routes: Routes = [
  { path: "", component: Index },
  { path: "Angular", component: Index },
  { path: "community", component: Community },
  { path: "teachersday/console.html", component: TeachersDay },
  { path: "ptais/street-capture.html", component: StreetCapture },
  { path: "pnid", component: PnID },
  { path: "**", redirectTo: "/" }
];

export const Declarations = [
  AppComponent,
  Index,
  TeachersDay,
  StreetCapture,
  PnID,
  PnID_Device,
  PnID_Dialog,
  Community
];
