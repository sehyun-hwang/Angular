import { Injectable, OnDestroy } from "@angular/core";
import io from "socket.io-client";


@Injectable({
  providedIn: "root"
})
export class IOInjectable extends (io as SocketIOClient.Socket) implements OnDestroy {
  constructor() {
    super("https://proxy.hwangsehyun.ga?port=8081");
    console.log(this)
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

