import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { CountdownModule } from 'ngx-countdown';
import { WebcamModule } from 'ngx-webcam';

import { Routes, RouterModule } from '@angular/router';
import {AppComponent}from "./app.component";

import { TeachersDay } from './TeachersDay.component';
import { StreetCapture } from './StreetCapture.component';
const routes: Routes  = [
  { path: 'teachersday/console.html', component: TeachersDay },
  { path: 'ptais/street-capture.html', component: StreetCapture },
]

@NgModule({
  declarations: [...routes.map(x=>x.component), AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,

    CountdownModule,
    WebcamModule,

    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }