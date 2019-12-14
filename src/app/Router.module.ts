import { Component, AfterViewChecked } from "@angular/core";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { RouterComponent } from "./Router.component";

import { Index } from "./index.component";
import { TeachersDay } from "./TeachersDay.component";
import { StreetCapture } from "./StreetCapture.component";
import { PnID } from "./PnID.component";
import { Community } from "./Community.component";
import { Routes } from "@angular/router";

export class ImportableRoutes {
  routes: Routes = [
    { path: "", component: Index },
    { path: "Angular", component: Index },
    { path: "community", component: Community },
    { path: "teachersday/console.html", component: TeachersDay },
    { path: "ptais/street-capture.html", component: StreetCapture },
    { path: "pnid", component: PnID },
    { path: "**", redirectTo: "/" }
  ];

  Import() {
    return this.routes
      .filter(route => route.component)
      .map(route => route.component);
  }
}

import { NgModule } from "@angular/core";

@NgModule({
  imports: [RouterModule.forRoot(ImportableRoutes.prototype.routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
