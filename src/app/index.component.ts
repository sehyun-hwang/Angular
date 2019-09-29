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
    this.routes=routes.map(x=>x.path)
    console.log(routes)
  }
}