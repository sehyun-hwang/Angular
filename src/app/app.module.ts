import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DemoMaterialModule } from "./modules/Material.module";
import { CountdownModule } from "ngx-countdown";
import { WebcamModule } from "ngx-webcam";
import { ChartsModule } from "ng2-charts";
import { GaugeModule } from "angular-gauge";

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { SocketIO } from "./modules/socket.io";

import { Index } from "./index.component";
import { TeachersDay } from "./TeachersDay.component";
import { StreetCapture } from "./StreetCapture.component";
import { PnID } from "./PnID.component";
import { PnID_Device, PnID_Dialog } from "./PnID-Device.component";
import { Community } from "./Community.component";

import { Routes } from "@angular/router";
export const routes: Routes = [
  { path: "", component: Index },
  { path: "Angular", component: Index },
  { path: "community", component: Community },
  { path: "teachersday/console.html", component: TeachersDay },
  { path: "ptais/street-capture.html", component: StreetCapture },
  { path: "pnid", component: PnID },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  declarations: [
    AppComponent,
    Index,
    Community,
    TeachersDay,
    StreetCapture,
    PnID,
    PnID_Device,
    PnID_Dialog
  ],
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

    RouterModule.forRoot(
      location.hostname.includes("pnid") || window["cordova"]
        ? [{ path: "**", component: PnID }]
        : routes
    )
  ],
  providers: [SocketIO],
  bootstrap: [AppComponent],
  entryComponents: [PnID_Dialog]
})
export class AppModule {}
