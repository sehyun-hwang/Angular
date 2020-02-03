import { Injectable } from "@angular/core";
// @ts-ignore
import io from "socket.io-client";

import { IOInterface } from "./PnID-Interfaces";

@Injectable()
export class IOInjectable extends (io as IOInterface) {
  Socket: SocketIOClient.Socket;

  constructor() {
    const Socket = (super(
      "https://proxy.hwangsehyun.com?port=8081"
    ) as unknown) as SocketIOClient.Socket;
    this.Socket = Socket;
  }
}

async function Parser(arg: string): Promise<any[]>
async function Parser(arg: Response): Promise<any[]> {
  arg
  const data: {
    Table: any[];
  } = await Promise.resolve(arg instanceof Response ? await arg.text() : arg)
    .then(
      text =>
        new DOMParser().parseFromString(text, "text/xml").firstElementChild
          .innerHTML
    )
    .then(JSON.parse);
  return Promise.resolve(data.Table);
}

export function Timestamp(n: number) {
  return new Date(n * 1000).toLocaleString();
}
