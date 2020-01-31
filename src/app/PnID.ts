import { Injectable, Host } from "@angular/core";
import io from "socket.io-client";

import { IOInterface } from "./PnID-Interfaces";

@Injectable()
export class IOInjectable extends (io as IOInterface) {
  Socket:SocketIOClient.Socket;

  constructor() {
    const Socket = super("https://proxy.hwangsehyun.com?port=8081") as unknown as SocketIOClient.Socket;
    this.Socket= Socket;
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

