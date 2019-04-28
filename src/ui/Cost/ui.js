import React from "react";

import Currency from "ui/Currency/ui";

const Cost = ({ title, value, animation = null }) => (
  <div className={`flex cost ${animation}`}>
    <h4>{title}</h4>
    <Currency value={value} />
  </div>
);

export default Cost;
