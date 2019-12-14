import { Component, AfterViewChecked } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Index } from "./index.component";
import { TeachersDay } from "./TeachersDay.component";
import { StreetCapture } from "./StreetCapture.component";
import { PnID } from "./PnID.component";
import { PnID_Device, PnID_Dialog } from "./PnID-Device.component";
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

@Component({
  selector: "app-root",
  template: `
    <button mat-button (click)="ngAfterViewChecked()">
      {{ route.pathFromRoot }}
    </button>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements AfterViewChecked {
  constructor(importableRoutes:ImportableRoutes, private router:Router) {
    router.resetConfig(importableRoutes.routes)
  }
  ngAfterViewChecked() {
    this.router.resetConfig([{ path: "**", component: HomeComponent }]);
  }
}
