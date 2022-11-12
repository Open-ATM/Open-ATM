import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { findByIds } from "usb";
import axios from 'axios';

import "./App.css";
import { truncate } from "./truncate";

const TronWeb = require("tronweb");
// require('dotenv').config()

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  headers: { "TRON-PRO-API-KEY": "25272698-5521-4839-b50c-830ae865719f" }, //<YOUR_API_KEY>
  privateKey: "4b7cb0db88f9c95a860b6977341db71580333c33f9a04b5d204e1e09ba796b07", //<YOUR_PRIVATE_KEY>
});

export enum progressType {
  HOME = "HOME",
  INSERTING_COINS = "INSERTING_COINS",
  CHOOSE_RECIPIENT = "CHOOSE_RECIPIENT",
  SCAN_QR_CODE = "SCAN_QR_CODE",
  CONFIRM_TRANSACTION = "CONFIRM_TRANSACTION",
  SENDING = "SENDING",
  SENT = "SENT",
}

function App() {
  const [progress, setProgress] = useState<progressType>(progressType.HOME);
  const [recipient, setRecipient] = useState<string | undefined>(undefined);
  const [coins, setCoins] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0.058477312648395)
  console.log(exchangeRate)

  useEffect(() => {
    async function fetchExchangeRate() {
      let response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=TRX', {
        withCredentials: false,
        headers: { 
          'X-CMC_PRO_API_KEY': "f449bd50-934e-41b9-936e-fa4c26863b8c",
          "Access-Control-Allow-Origin": "*"
        }
      })
      // setExchangeRate(response.data)
    }
    fetchExchangeRate()
  }, [])

  const websocket = new WebSocket(`ws://localhost:8080`)
  websocket.addEventListener('message', (event) => {
    try {
      if (typeof event.data === 'string') {
        const dataObject = JSON.parse(event.data)
        if (typeof dataObject === 'object' && typeof dataObject.message === 'string') {
          const message = JSON.parse(dataObject.message)
          if (message.coins && message.coins > 0) {
            setCoins(message.coins)
            setProgress(progressType.INSERTING_COINS)      
          }
        }
      }
    } catch (e: any) {
      console.log(e)
    }
  })

  useEffect (() => {
    if(recipient) setProgress(progressType.CONFIRM_TRANSACTION)
  }, [recipient]) 

  return (
    <div className="App">
      <img className="App-header" alt="header" src="/header.svg" />

      {progress === progressType.HOME && (
        <div
          className="Home"
        >
          <img
            className="Home-image"
            alt="insert-coin"
            src="/insert-coin.gif"
          />
          <div className="Home-text">Insert Coins</div>
        </div>
      )}

      {progress === progressType.INSERTING_COINS && (
        <div className="InsertingCoins">
          <div className="InsertingCoins-container">
            <div className="InsertingCoins-title">{(coins / exchangeRate).toFixed(0)} TRX</div>
            <div className="InsertingCoins-subtitle">{coins.toFixed(2)}€ Inserted</div>
          </div>

          <img
            className="InsertingCoins-button"
            alt="done"
            src="/button-done-inserting.svg"
            onClick={() => setProgress(progressType.CHOOSE_RECIPIENT)}
          />
        </div>
      )}

      {progress === progressType.CHOOSE_RECIPIENT && (
        <div className="ChooseRecipient">
          <img
            className="ChooseRecipient-button"
            alt="button"
            src="/button-send-to-wallet.svg"
            onClick={() => setProgress(progressType.SCAN_QR_CODE)}
          />
          <img
            className="ChooseRecipient-button"
            alt="button"
            src="/button-send-to-red-cross.svg"
            onClick={() => setProgress(progressType.SCAN_QR_CODE)}
          />
          <img
            className="ChooseRecipient-button"
            alt="button"
            src="/button-send-to-unicef.svg"
            onClick={() => setProgress(progressType.SCAN_QR_CODE)}
          />
        </div>
      )}

      {progress === progressType.SCAN_QR_CODE && (
        <div className="ScanQrCode">
          <div className="ScanQrCode-title">Please scan your wallet</div>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setRecipient(result?.getText());
                }
              }}
              constraints={{ facingMode: "user" }}
            />
        </div>
      )}

      {progress === progressType.CONFIRM_TRANSACTION && (
        <div className="ConfrmTransaction">
          <div className="ConfrmTransaction-container">
            <div className="ConfrmTransaction-subtitle">Send</div>
            <div className="ConfrmTransaction-title">{(coins / exchangeRate).toFixed(0)} TRX</div>
            <div className="ConfrmTransaction-subtitle">To</div>
            <div className="ConfrmTransaction-title">{recipient ? truncate(recipient) : recipient}</div>
          </div>

          <img
            className="ConfrmTransaction-button"
            alt="done"
            src="/button-confirm.svg"
            onClick={async() => {
              setProgress(progressType.SENDING)

              var fromAddress = "TTcHWUnU5NUeVduHLCkMmNa5JuDL1yNM91";
              var toAddress = recipient;
              var amount = Math.round(coins / exchangeRate * 1000000);
              const tradeobj = await tronWeb.transactionBuilder.sendTrx(
                    toAddress,
                    amount,
                    fromAddress
              );
              const signedtxn = await tronWeb.trx.sign(
                    tradeobj,
              );
              await tronWeb.trx.sendRawTransaction(
                    signedtxn
              ).then((output: any) => {
                console.log('- Output:', output, '\n');
                setProgress(progressType.SENT)
                setTimeout(() => {
                  setProgress(progressType.HOME)
                }, 6000)
              });
             
            }}
          />
        </div>
      )}

      {progress === progressType.SENDING && (
        <div className="Sending">
          <img className="Sending-image" alt="loader" src="/loader.svg" />
          <div className="Sending-text">Sending...</div>
        </div>
      )}

      {progress === progressType.SENT && (
        <div className="Sent">
          <img className="Sent-image" alt="sent" src="/sent.svg" />
          <div className="Sent-text">Sent</div>
        </div>
      )}
    </div>
  );
}

export default App;
