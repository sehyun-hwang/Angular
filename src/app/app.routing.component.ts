import { Component, AfterViewChecked, OnInit} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { routes } from "./app.routing.module";

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
export class AppComponent  implements OnInit {
  DisplayRouterInfo = false;
  Fragment: string;

  constructor(router: Router, public route: ActivatedRoute) {
    if (location.hostname.includes("pnid") || "cordova" in window)
      router.resetConfig([{ path: "**", component: PnID }]);
    else this.DisplayRouterInfo = true;
  }

  ngOnInit() {
    console.log(123)
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
    const _routes = routes.map(x => x.path);
    _routes.shift();
    this.routes = _routes;
    console.log(routes);
  }
}
