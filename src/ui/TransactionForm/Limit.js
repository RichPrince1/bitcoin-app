import React from "react";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

import Currency from "ui/Currency/ui";

const Limit = ({ limit, up, down, userUsdBalance }) => (
  <div className="flex limit">
    <h3>Current limit</h3>
    <div className="controls">
      <button onClick={up} disabled={limit === parseFloat(userUsdBalance)}>
        <FaArrowAltCircleUp />
      </button>
      <button onClick={down} disabled={limit === parseFloat(0)}>
        <FaArrowAltCircleDown />
      </button>
    </div>
    <Currency value={limit} />
  </div>
);

export default Limit;
