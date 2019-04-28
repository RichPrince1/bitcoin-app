import React from "react";

import { MdMoneyOff } from "react-icons/md";

import Field from "./Field";
import Limit from "./Limit";
import Cost from "ui/Cost/ui";

const TransactionForm = ({
  transactionType,
  usdField,
  btcField,
  limitField,
  user,
  fees,
  total,
  onSubmit,
  ...props
}) => {
  const submit = e => {
    e.preventDefault();
    onSubmit();
  };

  const buying = transactionType === "buy";
  const selling = transactionType === "sell";

  const usdErrorMessage = "Amount entered exceeds available funds.";
  const btcErrorMessage = "Amount entered exceeds available coins.";

  return (
    <section className={`flex-col ${transactionType}`}>
      <h2>
        <MdMoneyOff size={30} />
        {transactionType}
      </h2>
      <div className="flex form">
        <form onSubmit={submit}>
          <div className="fields">
            <Field
              {...usdField}
              transactionType={transactionType}
              thousandSeparator={true}
              prefix={"$"}
              error={buying && usdField.error ? usdErrorMessage : null}
            />
            <span className="decorator" />
            <Field
              {...btcField}
              transactionType={transactionType}
              error={selling && btcField.error ? btcErrorMessage : null}
            />
          </div>
          <button
            type="submit"
            disabled={btcField.value === 0 || usdField.value === 0}
          >
            {transactionType}
          </button>
        </form>
        <div className="costs">
          <Limit
            limit={limitField.value}
            up={limitField.up}
            down={limitField.down}
            userUsdFieldBalance={user.usdField}
            error={buying && usdField.error ? usdErrorMessage : null}
          />
          <Cost title="Fees" value={fees} />
          <Cost title="Total" value={total} />
        </div>
      </div>
    </section>
  );
};

export default TransactionForm;
