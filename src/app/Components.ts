import { AppComponent } from "./app.routing.component";
import { Index } from "./app.routing.component";
import { TeachersDay } from "./TeachersDay.component";
import { StreetCapture } from "./StreetCapture.component";
import { PnID } from "./PnID.component";
import { PnID_Device, PnID_Switch } from "./PnID-Device.component";
import { PnID_Dialog } from "./PnID-Dialog.component";
import { Community } from "./Community.component";

import { Routes } from "@angular/router";
export { AppComponent, PnID_Dialog };

export const Declarations = [
  AppComponent,
  Index,
  TeachersDay,
  StreetCapture,
  PnID,
  PnID_Device,
  PnID_Dialog,
  PnID_Switch,
  Community
];

export function routes (): Routes {
  return [
  { path: "", component: Index },
  { path: "pnid", component: PnID },
  { path: "community", component: Community },
  { path: "teachersday/console", component: TeachersDay },
  { path: "ptais/street-capture.html", component: StreetCapture },
  { path: "**", redirectTo: "" },
]}
