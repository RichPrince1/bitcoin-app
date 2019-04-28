import React from "react";
import NumberFormat from "react-number-format";
import { FaBitcoin } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

export const PlainCurrency = ({ value, ...props }) => (
  <NumberFormat
    value={value}
    displayType={"text"}
    decimalScale={2}
    fixedDecimalScale={true}
    thousandSeparator={true}
    prefix={"$"}
    {...props}
  />
);

export const CoinCurrency = ({ value, decimals = 3 }) => (
  <NumberFormat
    value={value}
    displayType={"text"}
    decimalScale={decimals}
    fixedDecimalScale={true}
    thousandSeparator={true}
    renderText={formattedValue => (
      <span className="currency">
        <b>
          {formattedValue}
          <FaBitcoin color="gold" />
        </b>
      </span>
    )}
  />
);

const Currency = ({ value }) => (
  <PlainCurrency
    value={value}
    prefix={""}
    renderText={formattedValue => (
      <span className="currency">
        <b>
          <MdAttachMoney color="green" />
          {formattedValue}
        </b>
      </span>
    )}
  />
);

export default Currency;
