import { Component } from '@angular/core';
import { Input } from '@angular/core';
import {routes} from "./Routes";

@Component({
  selector: 'index',
  template: `<div *ngFor="let route of routes">
  <a [routerLink]="[route]">{{route}}</a>
  </div>`,
})
export class Index {
  routes:string[];
  constructor() {
    this.routes=routes.map(x=>x.path)
    console.log(routes)
  }
}