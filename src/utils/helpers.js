export const increaseBalance = (balance, amount) => Math.abs(balance + amount);
export const decreaseBalance = (balance, amount) => Math.abs(balance - amount);

export const toUSD = (btc, exchangeRate) => exchangeRate * btc;
export const toBTC = (usd, exchangeRate) => usd / exchangeRate;

// 0.1% of transaction value in USD
export const getFees = (amountSpent, percentOf = 0.001) =>
  percentOf * parseFloat(amountSpent);

export const getTotalCost = (amountSpent, fee = 0) =>
  parseFloat(amountSpent) + parseFloat(fee);

export const formatCurrency = value => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

  return formatted;
};

export const priceChange = (currentPrice, lastPrice) => {
  if (lastPrice) {
    const diff = lastPrice - currentPrice;
    const change = lastPrice === 0 ? 0 : diff / lastPrice;
    const percentChange = change * 100;

    return percentChange;
  } else {
    return null;
  }
};

export const fetchData = url => {
  return fetch(url)
    .then(r => r.json())
    .then(result => result)
    .catch(e => console.log("Fetch error", e));
};
