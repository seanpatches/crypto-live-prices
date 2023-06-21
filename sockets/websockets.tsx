import { debounce } from 'lodash';
import { getProductIDList } from '../types';

const baseUrl = 'wss://ws-feed.exchange.coinbase.com';

const productIDList = getProductIDList();
const coinbaseSubscriptionMessage = {
    type: 'subscribe',
    channels: [
        {
            name: 'ticker',
            product_ids: productIDList
        }
    ]
};

export const createTickerWebsocket = (
    websocketMessageHandler: (message: any) => void
) => {
    const tickerWebsocket = new WebSocket(baseUrl);

    const restartWebsocket = () => {
        //recreates the websocket if it is closed unintentionally
        const reconnectTimeout = setTimeout(async () => {
            createTickerWebsocket(websocketMessageHandler);
            console.log('Reconnecting socket');
            clearTimeout(reconnectTimeout);
        }, 1000);
    };

    tickerWebsocket.onopen = () => {
        console.log('connection open');
        //coinbase specifically demands that a subscription message is sent within 5s of socket open
        tickerWebsocket.send(JSON.stringify(coinbaseSubscriptionMessage));
    };

    tickerWebsocket.onmessage = debounce(
        (e: WebSocketMessageEvent) => {
            const data = JSON.parse(e.data);
            websocketMessageHandler(data);
        },
        100,
        { leading: true }
    );

    tickerWebsocket.onclose = (e) => {
        if (e.code === 1000 || e.code === 1001) {
            //these 2 codes are provided by intentional closures to allow them without a reconnection
            console.log('Websocket closed intentionally.');
        } else {
            restartWebsocket();
        }
    };

    tickerWebsocket.onerror = (e) => {
        console.log('error', e.message);
    };

    return tickerWebsocket;
};
