import "./polyfills";
import "hammerjs";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(ref => {
    console.log("Bootstrap");

    if (window["ngRef"] && !window["ngRef"]["distroyed"])
      window["ngRef"].destroy();
    window["ngRef"] = ref;

  })
  .catch(err => console.error(err));
