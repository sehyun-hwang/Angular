import { HttpClientModule } from "@angular/common/http";
import { NgModule, ApplicationRef } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
//import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CountdownModule } from "ngx-countdown";
import { WebcamModule } from "ngx-webcam";
import { ChartsModule } from "ng2-charts";
import { GaugeModule } from "angular-gauge";

import { DemoMaterialModule } from "./modules/Material.module";

import { DoBootstrap } from "@angular/core"
import { RouterModule } from "@angular/router";
import { routes, AppComponent, Declarations, PnID_Dialog } from "./Components";

@NgModule({
  declarations: Declarations,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    CountdownModule,
    WebcamModule,
    ChartsModule,
    GaugeModule.forRoot(),

    RouterModule.forRoot(routes())
  ],
  providers: [],
  //bootstrap: [AppComponent],
  entryComponents: [AppComponent, PnID_Dialog]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(app: ApplicationRef) {
    function Bootstrap() {
      app.bootstrap(AppComponent);
    }
    if ("cordova" in window)
      window["Bootstrap"] = () => {
        Bootstrap();
        Bootstrap();
      };
    else Bootstrap();
  }
}
