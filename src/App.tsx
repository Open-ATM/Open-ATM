import React, { useState } from 'react';

import './App.css';

export enum progressType {
  HOME = 'HOME',
  INSERTING_COINS = 'INSERTING_COINS',
  CHOOSE_RECIPIENT = 'CHOOSE_RECIPIENT',
  SCAN_QR_CODE = 'SCAN_QR_CODE',
  CONFIRM_TRANSACTION = 'CONFIRM_TRANSACTION',
  SENDING = 'SENDING',
  SENT = 'SENT'
}

function App() {
  const [progress, setProgress] = useState<progressType>(progressType.HOME)

  return (
    <div className="App">
      <img className="App-header" alt="header" src="/header.svg" />
    </div>
  );
}

export default App;
