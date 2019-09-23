import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { CountdownModule } from 'ngx-countdown';
import { WebcamModule } from 'ngx-webcam';

import { Routes, RouterModule } from '@angular/router';
import {AppComponent}from "./app.component";

import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { TeachersDay } from './TeachersDay.component';
import { StreetCapture } from './StreetCapture.component';
import { PnID } from './PnID.component';
const routes: Routes  = [
  { path: 'teachersday/console.html', component: TeachersDay },
  { path: 'ptais/street-capture.html', component: StreetCapture },
  { path: 'pnid/index', component: PnID },
]

@NgModule({
  declarations: [...routes.map(x=>x.component), AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  MatAutocompleteModule,

    CountdownModule,
    WebcamModule,

    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }