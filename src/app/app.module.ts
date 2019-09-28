import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';

import { CountdownModule } from 'ngx-countdown';
import { WebcamModule } from 'ngx-webcam';
import { Routes, RouterModule } from '@angular/router';

import {AppComponent}from "./app.component";

import { TeachersDay } from './TeachersDay.component';
import { StreetCapture } from './StreetCapture.component';
import { PnID } from './PnID.component';
const routes: Routes  = [
  { path: 'teachersday/console.html', component: TeachersDay },
  { path: 'ptais/street-capture.html', component: StreetCapture },
  { path: '', component: PnID },
]

@NgModule({
  declarations: [...routes.map(x=>x.component),
    AppComponent
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

    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }