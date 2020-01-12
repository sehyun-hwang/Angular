export interface IOInterface extends SocketIOClientStatic {
  new(URL: string, Options?: SocketIOClient.ConnectOpts): any
}



export interface Realtime {
  duration: number;
  ttl: number;
  delay: number;
  refresh: number;
  onRefresh: (ChartConfiguration) => void;
  frameRate: number;
  pause: boolean;
}

import { ChartXAxe } from "chart.js";
export interface XAxe extends ChartXAxe {
  type: string;
  realtime: Realtime;
}