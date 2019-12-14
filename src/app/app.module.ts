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

import { RouterModule } from "./Router.module";
import { SocketIO } from "./modules/socket.io";
import { PnID_Device, PnID_Dialog } from "./PnID-Device.component";

@NgModule({
  declarations: [
    AppComponent,
    PnID_Device, PnID_Dialog,
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
    RouterModule.forRoot(),
  ],
  providers: [SocketIO],
  bootstrap: [AppComponent],
  entryComponents: [PnID_Dialog]
})
export class AppModule {}
