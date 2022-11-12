import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { findBySerialNumber, WebUSBDevice } from 'usb';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let coinAcceptor: WebUSBDevice;

(async () => {
    const device = await findBySerialNumber('COIN_ACCEPTOR');
    if(device) coinAcceptor = await WebUSBDevice.createInstance(device);
})();
 
wss.on('connection', async (ws: WebSocket) => {

    ws.on('message', (message: string) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    if (coinAcceptor) {
        await coinAcceptor.open()
        const coinIn = coinAcceptor.transferIn(16, 256)
        ws.send({coins: coinIn});
    }
});

server.listen(process.env.PORT || 8999, () => {
    //@ts-ignore
    console.log(`Server started on port ${server?.address()?.port} :)`);
});