const baseUrl = "wss://ws-feed.exchange.coinbase.com";

const coinbaseSubscriptionMessage = {
  "type": "subscribe",
  "channels": [
    {
      "name": "ticker",
      "product_ids": [
          "BTC-USD",
          "ETH-USD",
          "FLOW-USD",
          "ALGO-USD"
      ]
    }
  ]
}

export const createTicketWebsocket = () => {
  const tickerWebsocket = new WebSocket(baseUrl);

  tickerWebsocket.onopen = () => {
    console.log('connection open');
    tickerWebsocket.send(JSON.stringify(coinbaseSubscriptionMessage));
  };

  tickerWebsocket.onmessage = (e) => {
    console.log(e);
  };

  tickerWebsocket.onclose = (e) => {
    console.log("closed", e.code, e.reason);
  };

  tickerWebsocket.onerror = (e) => {
    console.log("error", e.message);
  };

  return tickerWebsocket;
}
