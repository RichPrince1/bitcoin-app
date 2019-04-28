import React from "react";

import Ticker from "ui/Ticker/Ticker";

const AppHeader = ({ exchangeRate, ...props }) => (
  <header className="flex-around header stripes">
    <h1 className="logo">BTC Exchange</h1>
    {exchangeRate && (
      <Ticker key="rate-ticker" exchangeRate={exchangeRate} {...props} />
    )}
  </header>
);

export default AppHeader;
