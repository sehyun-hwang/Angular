import { Injectable, OnDestroy } from "@angular/core";
import IOClient from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class IOInjectable implements OnDestroy {
  io;
  constructor(){
    console.log("constructed")
    this.io = IOClient("https://proxy.hwangsehyun.ga?port=8081");
  }
  ngOnDestroy() {
    console.log("Connetion close");
    this.io.close();
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
