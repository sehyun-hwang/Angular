import { Component, AfterViewChecked } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-root",
  template: `
    <button mat-button (click)="ngAfterViewChecked()">
      {{ route.pathFromRoot }}
    </button>
    <router-outlet></router-outlet>
  `
})
export class RouterComponent implements AfterViewChecked {
  constructor(importableRoutes:ImportableRoutes, private router:Router) {
    router.resetConfig(importableRoutes.routes)
  }
  ngAfterViewChecked() {
    this.router.resetConfig([{ path: "**", component: PnID }]);
  }
}