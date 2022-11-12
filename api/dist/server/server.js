"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const usb_1 = require("usb");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let coinAcceptor;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield (0, usb_1.findBySerialNumber)('COIN_ACCEPTOR');
    if (device)
        coinAcceptor = yield usb_1.WebUSBDevice.createInstance(device);
}))();
wss.on('connection', (ws) => __awaiter(void 0, void 0, void 0, function* () {
    ws.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    if (coinAcceptor) {
        yield coinAcceptor.open();
        const coinIn = coinAcceptor.transferIn(16, 256);
        ws.send({ coins: coinIn });
    }
}));
server.listen(process.env.PORT || 8999, () => {
    var _a;
    //@ts-ignore
    console.log(`Server started on port ${(_a = server === null || server === void 0 ? void 0 : server.address()) === null || _a === void 0 ? void 0 : _a.port} :)`);
});
//# sourceMappingURL=server.js.map