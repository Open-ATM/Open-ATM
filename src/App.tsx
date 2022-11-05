import React, { useState } from "react";

import "./App.css";

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

  return (
    <div className="App">
      <img className="App-header" alt="header" src="/header.svg" />

      {progress === progressType.HOME && (
        <div
          className="Home"
          onClick={() => setProgress(progressType.INSERTING_COINS)}
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
            <div className="InsertingCoins-title">41.23 TRX</div>
            <div className="InsertingCoins-subtitle">2.60€ Inserted</div>
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
          <img
            className="ScanQrCode-qr"
            alt="button"
            src="/qr-demo.png"
            onClick={() => setProgress(progressType.CONFIRM_TRANSACTION)}
          />
        </div>
      )}

      {progress === progressType.CONFIRM_TRANSACTION && (
        <div className="ConfrmTransaction">
          <div className="ConfrmTransaction-container">
            <div className="ConfrmTransaction-subtitle">Send</div>
            <div className="ConfrmTransaction-title">41.23 TRX</div>
            <div className="ConfrmTransaction-subtitle">To</div>
            <div className="ConfrmTransaction-title">TVxfX...C4CEn</div>
          </div>

          <img
            className="ConfrmTransaction-button"
            alt="done"
            src="/button-confirm.svg"
            onClick={() => setProgress(progressType.SENDING)}
          />
        </div>
      )}

      {progress === progressType.SENDING && (
        <div className="Sending" onClick={() => setProgress(progressType.SENT)}>
          <img className="Sending-image" alt="loader" src="/loader.svg" />
          <div className="Sending-text">Sending...</div>
        </div>
      )}

      {progress === progressType.SENT && (
        <div className="Sent" onClick={() => setProgress(progressType.HOME)}>
          <img className="Sent-image" alt="sent" src="/sent.svg" />
          <div className="Sent-text">Sent</div>
        </div>
      )}
    </div>
  );
}

export default App;
