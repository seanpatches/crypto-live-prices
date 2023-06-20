export type CryptoPrices = {
  BTC: number,
  ETH: number,
  FLOW: number,
  ALGO: number,
};

export enum CurrencyTypes {
  BTC = "BTC",
  ETH = "ETH",
  FLOW = "FLOW",
  ALGO = "ALGO",
}

export enum MessageTypes {
  BTC = "BTC-USD",
  ETH = "ETH-USD",
  FLOW = "FLOW-USD",
  ALGO = "ALGO-USD",
}

export type ChangingPrices = {
  currency: string,
  price: number
}