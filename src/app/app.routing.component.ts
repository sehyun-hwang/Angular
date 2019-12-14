import { Component, AfterViewChecked, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { routes } from "./app.routing.module";

@Component({
  selector: "app-root",
  template: `
    <button mat-button (click)="router.navigate('')">
    </button>
    <router-outlet></router-outlet>
    `
})
export class AppComponent implements AfterViewChecked {
  constructor(private router:Router) {}
  ngAfterViewChecked() {
    
    this.router.resetConfig([{ path: "**", component: PnID }]);
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
