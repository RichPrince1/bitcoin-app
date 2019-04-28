import React from "react";
import NumberFormat from "react-number-format";
let timer = null;

export const Field = ({
  label,
  value,
  blur,
  change,
  transactionType,
  decimals = 2,
  error,
  ...props
}) => {
  return (
    <div>
      <div className="flex field">
        <label>{label.toUpperCase()}</label>
        <NumberFormat
          key={`${transactionType}-input-${label}`}
          value={value}
          isNumericString={true}
          decimalScale={decimals}
          fixedDecimalScale={true}
          placeholder={label.toUpperCase()}
          onValueChange={values => {
            // Update values
            change(values, transactionType);
            clearTimeout(timer);
            // Calculate other field after user stops typing
            timer = setTimeout(blur, 500);
          }}
          {...props}
        />
      </div>
      {error && <div className={`field-error`}>{error}</div>}
    </div>
  );
};

export default Field;
