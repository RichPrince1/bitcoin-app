import React, {Component} from "react";
import NumberFormat from "react-number-format";

import Cost from "ui/Cost/ui";

export const Percentage = ({ value, animation, ...props }) => (
  <div className={`flex percentage ${animation}`}>
    <NumberFormat
      value={value}
      style={{ animationDelay: "250ms" }}
      className={props.indicator}
      displayType={"text"}
      decimalScale={3}
      suffix={"%"}
      {...props}
    />
  </div>
);

const Ticker = ({ exchangeRate, indicator, lastPrice, changed, animation }) => {
  const indicatorSymbol =
    !changed || changed === 0 ? "indicator" : `indicator ${indicator}`;

  return (
    <section className={`flex ticker`}>
      <Cost
        key="rate"
        title="Rate"
        value={exchangeRate}
        animation={`${animation} ${indicator}`}
      />
      <Percentage
        key="percent-change"
        indicator={indicatorSymbol}
        value={Math.abs(changed)}
        animation={`${animation} ${indicator}`}
      />
    </section>
  );
};

export default Ticker;
