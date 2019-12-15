import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { routes, PnID_Dialog } from "./Components";

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  entryComponents: [PnID_Dialog]
})
export class Routing {}
