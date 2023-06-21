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

export const createTickerWebsocket = (websocketMessageHandler: (message: any) => void) => {
  const tickerWebsocket = new WebSocket(baseUrl);

  const restartWebsocket = () => {
    //recreates the websocket if it is closed unintentionally
    const reconnectTimeout = setTimeout(async () => {
      createTickerWebsocket(websocketMessageHandler);
      console.log('Reconnecting socket')
      clearTimeout(reconnectTimeout);
    }, 1000);
  }

  tickerWebsocket.onopen = () => {
    console.log('connection open');
    //coinbase specifically demands that a subscription message is sent within 5s of socket open
    tickerWebsocket.send(JSON.stringify(coinbaseSubscriptionMessage));
  };

  tickerWebsocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    websocketMessageHandler(data);
  };

  tickerWebsocket.onclose = (e) => {
    if (e.code === 1000) {
      //this code can be provided on intentional closures to allow them without a reconnection
      console.log("Websocket closed intentionally.")
    } else {
      restartWebsocket();
    }
  };

  tickerWebsocket.onerror = (e) => {
    console.log("error", e.message);
  };

  return tickerWebsocket;
}
