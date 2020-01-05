import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { routes } from "./Components";
import { PnID } from "./PnID.component";

@Component({
  selector: "app-root",
  template: `
    <button mat-button *ngIf="DisplayRouterInfo" routerLink="''">
      Back to Index
    </button>
    <span [innerText]="Fragment"></span>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  DisplayRouterInfo = false;
  Fragment: string;

  constructor(router: Router, public route: ActivatedRoute) {
    if ("cordova" in window)
      router.resetConfig([{ path: "**", component: PnID }]);
    else {
      router.resetConfig(routes());
      this.DisplayRouterInfo = true;
    }
  }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.Fragment = segments.toString();
    });
  }
}

@Component({
  selector: "index",
  templateUrl: "./app.routing.component.html"
})
export class Index {
  routes: string[];
  constructor() {
    const _routes = routes().map(x => x.path);
    _routes.shift();
    this.routes = _routes;
    console.log(_routes);
  }
}
