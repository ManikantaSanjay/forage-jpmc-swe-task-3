import { ServerRespond } from './DataStreamer';

export interface Row {
  price_ABC: number,
  price_DEF: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const price_ABC = (serverResponds[0].top_bid.price + serverResponds[0].top_ask.price) / 2;
    const price_DEF = (serverResponds[1].top_bid.price + serverResponds[1].top_ask.price) / 2;
    const ratio = price_ABC / price_DEF;
    const upper_bound = 1 + 0.05; // For instance, assuming 5% as the upper bound
    const lower_bound = 1 - 0.05; // For instance, assuming 5% as the lower bound

    return {
      price_ABC,
      price_DEF,
      ratio,
      upper_bound,
      lower_bound,
      trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? 
                  serverResponds[0].timestamp : serverResponds[1].timestamp,
    };
  }
}
