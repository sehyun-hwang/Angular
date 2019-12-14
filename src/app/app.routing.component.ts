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

import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { routes } from "./app.module";

@Component({
  selector: "index",
  templateUrl: "./index.component.html"
})
export class Index {
  routes: string[];
  constructor() {
    const _routes = routes.map(x => x.path);
    _routes.shift();
    this.routes = _routes;
    console.log(routes);
  }
}
