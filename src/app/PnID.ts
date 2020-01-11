import { Injectable, OnDestroy } from "@angular/core";
// @ts-ignore
import io from "socket.io-client";
import io_type from "@types/socket.io";

function AllProperties(In, Out = {}) {
  const keys = Object.getOwnPropertyNames(In);
  keys.forEach(key =>
    Object.defineProperty(In, key, {
      enumerable: true
    })
  );
  Out = { ...In, ...Out };

  const Prototype = Object.getPrototypeOf(In);
  return Prototype === Object.prototype ? Out : AllProperties(Prototype, Out);
}

@Injectable({
  providedIn: "root"
})
export class IOInjectable implements OnDestroy {
  constructor() {
    Object.assign(this, AllProperties(io("https://proxy.hwangsehyun.ga?port=8081")));
  }
  ngOnDestroy() {
    this.close();
  }
}

export async function Parser(promise: Response) {
  const data = await promise
    .text()
    .then(
      text =>
        new DOMParser().parseFromString(text, "text/xml").firstElementChild
          .innerHTML
    )
    .then(JSON.parse);
  return data.Table[0];
}

export function Timestamp(n: number) {
  return new Date(n * 1000).toLocaleString();
}
