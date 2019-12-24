import { Injectable } from "@angular/core";
import IOClient from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class IOInjectable {
  io;
  constructor() {
    this.io = IOClient("https://proxy.hwangsehyun.ga?port=8081");
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
