import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";

interface SomeInterface extends Socket {
  new (url: string): Socket;
}

@Injectable()
export class IOInjectable extends (io as unknown as SomeInterface) {
  Socket: Socket;

  constructor() {
    const Socket = super("https://proxy.hwangsehyun.com?port=8081");
    Object.assign(this, { Socket });
  }
}

export async function Parser(arg: Response | string): Promise<any[]> {
  if (Array.isArray(arg)) return Promise.resolve(arg);

  const data: {
    Table: any[];
  } = await Promise.resolve(arg instanceof Response ? await arg.text() : arg)
    .then(
      (text) =>
        new DOMParser().parseFromString(text, "text/xml").firstElementChild
          .innerHTML
    )
    .then(JSON.parse);
  return Promise.resolve(data.Table);
}

export function Timestamp(n: number) {
  return new Date(n * 1000).toLocaleString();
}
