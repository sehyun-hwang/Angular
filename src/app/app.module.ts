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

import { Declarations, Routing } from "./app.routing.module";
import { SocketIO } from "./modules/socket.io";
import { AppComponent } from "./app.routing.component";

@NgModule({
  declarations: [AppComponent, ...Declarations],
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
    
    Routing,
  ],
  providers: [SocketIO],
  bootstrap: [AppComponent],
})
export class AppModule {}
