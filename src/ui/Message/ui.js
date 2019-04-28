import React from "react";

import { CoinCurrency, PlainCurrency } from "ui/Currency/ui";

export const FailureMessage = ({
  needed = null,
  userBalance = null,
  isCurrency = false
}) => (
  <>
    <h4>Transaction Prevented.</h4>
    <div className="message-body">
      You have
      {isCurrency ? (
        <PlainCurrency value={userBalance} />
      ) : (
        <CoinCurrency value={userBalance} decimals={1} />
      )}
      but require
      <mark>
        {isCurrency ? (
          <PlainCurrency value={needed} />
        ) : (
          <CoinCurrency value={needed} decimals={3} />
        )}
      </mark>
      more.
    </div>
  </>
);

export const SuccessMessage = ({
  btc,
  total,
  transaction,
  isCurrency = false
}) => (
  <>
    <h4>Transaction Complete.</h4>
    <div className="message-body">
      You {transaction} <CoinCurrency value={btc} />
      for
      <mark>
        {isCurrency ? (
          <PlainCurrency value={total} />
        ) : (
          <CoinCurrency value={total} />
        )}
      </mark>
      .
    </div>
  </>
);

const Message = ({ type, show, ...props }) => (
  <div className={`message ${type} ${show ? "show" : ""}`}>
    {type === "success" ? (
      <SuccessMessage {...props} />
    ) : (
      <FailureMessage {...props} />
    )}
  </div>
);

export default Message;
