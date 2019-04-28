import React from "react";
import Currency, { CoinCurrency } from "ui/Currency/ui";

const Balance = ({ btc, usd }) => (
  <section className="flex-around balance">
    <h4>Your balance</h4>
    <CoinCurrency value={btc} decimals={Number.isInteger(btc) ? 0 : 3} />
    <Currency value={usd} />
  </section>
);

export default Balance;
