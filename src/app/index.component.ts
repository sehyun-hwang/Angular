import { Component } from '@angular/core';
import { Input } from '@angular/core';
import {routes} from "./Routes";

@Component({
  selector: 'index',
  templateUrl: "./index.component.html",
})
export class Index {
  routes:string[];
  constructor() {
    const _routes =routes.map(x=>x.path);
    _routes.shift();
    this.routes = _routes;
    console.log(routes)
  }
}