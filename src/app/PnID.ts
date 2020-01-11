import { Injectable, OnDestroy } from "@angular/core";
import io from "socket.io-client";

function AllProperties(In:object, Out:object = {}):object {
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

interface SomeInterface extends SocketIOClientStatic {
  new(someParam: any): any
}

@Injectable({
  providedIn: "root"
})
export class IOInjectable extends (io as SomeInterface) implements OnDestroy {
  constructor() {
    super("https://proxy.hwangsehyun.ga?port=8081");
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
