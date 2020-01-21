import {
  Component,
  Input,
  OnChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import { Parser } from "./PnID";

@Component({
  selector: "pnid-dialog",
  templateUrl: "PnID-Dialog.component.html"
})
export class PnID_Dialog {
  emailFormControl = new FormControl(
    "",
    Validators.required,
    async ({ value }) =>
      fetch("https://plantasset.kr/MPIS_WCF/webservice.asmx/LOGIN", {
        method: "POST",
        body: (function() {
          const Param = new URLSearchParams();
          JSON.parse(
            '["id","pwd","model","cordova","platform","uuid","version","manufacturer","isvirtual","serial","latitude","longitude","macaddress"]'
          ).forEach(x =>
            Param.append(
              x,
              {
                id: "mpis",
                pwd: value
              }[x] || null
            )
          );
          return Param;
        })()
      })
        .then(Parser)
        .then(data => ("STATUS" in data ? { error: "Wrong Password" } : null))
  );

  matcher = new MyErrorStateMatcher();
}

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}