import { Component, AfterViewChecked } from "@angular/core";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { RouterComponent } from "./Router.component";

import { Index } from "./app.routing.component";
import { TeachersDay } from "./TeachersDay.component";
import { StreetCapture } from "./StreetCapture.component";
import { PnID } from "./PnID.component";
import { PnID_Device, PnID_Dialog } from "./PnID-Device.component";
import { Community } from "./Community.component";
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", component: Index },
  { path: "Angular", component: Index },
  { path: "community", component: Community },
  { path: "teachersday/console.html", component: TeachersDay },
  { path: "ptais/street-capture.html", component: StreetCapture },
  { path: "pnid", component: PnID },
  { path: "**", redirectTo: "/" },
];

export const Declarations = routes
  .filter(route => route.component)
  .map(route => route.component)
  .concat([PnID_Device, PnID_Dialog]);

import { NgModule } from "@angular/core";

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  entryComponents: [PnID_Dialog],
})
export class Routing {}
