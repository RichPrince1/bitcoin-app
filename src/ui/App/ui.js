import React, { Component } from "react";

// Data
import user from "data/user.json";

// Components
import AppRoutes from "./routes";
import AppHeader from "./AppHeader";
import AccountHeader from "ui/AccountHeader/ui";
import Balance from "ui/Balance/ui";
import Message from "ui/Message/ui";

// helpers
import { log } from "utils/log";
import {
  toBTC,
  toUSD,
  getFees,
  getTotalCost,
  decreaseBalance,
  increaseBalance,
  priceChange,
  fetchData
} from "utils/helpers";

export const Loader = () => <div className="loader">Getting rate...</div>;

class App extends Component {
  CHECK_PRICE_INTERVAL = 15000;
  LIMIT_MIN = 100;

  state = {
    user,
    message: null,
    exchangeRate: null,
    ticker: {
      lastPrice: null,
      changed: 0
    },
    btc: 0,
    usd: 0,
    exceedsUsdError: null,
    exceedsCoinsError: null,
    limit: 0,
    fees: 0,
    total: 0
  };

  resetAnimation = () => {
    this.resetTimeout = setTimeout(() => {
      this.setState(
        prevState => ({
          message: { ...prevState.message, ...{ show: null } }
        }),
        log("Reset state", this.state.message)
      );
    }, 4000);
  };

  sell = () => {
    this.resetAnimation();
    const { btc: btcToSell, total, user, exceedsCoinsError } = this.state;
    const coinsNeeded = user.btc - btcToSell;

    if (exceedsCoinsError || Math.sign(coinsNeeded) === -1) {
      console.log("Insufficient coins.", coinsNeeded);

      this.setState({
        message: {
          show: true,
          type: "error",
          transaction: "sold",
          btc: btcToSell,
          userBalance: user.btc,
          needed: Math.abs(coinsNeeded),
          total
        }
      });
    } else {
      console.log("Sufficient coins.", coinsNeeded);

      this.setState(prevState => ({
        message: {
          show: true,
          type: "success",
          transaction: "sold",
          btc: btcToSell,
          isCurrency: true,
          total
        },
        user: {
          ...user,
          btc: decreaseBalance(prevState.user.btc, btcToSell),
          usd: increaseBalance(prevState.user.usd, total)
        }
      }));
    }
  };

  buy = () => {
    this.resetAnimation();
    const { btc: btcBought, total, user, exceedsUsdError } = this.state;
    const fundsNeeded = user.usd - total;

    if (exceedsUsdError || Math.sign(fundsNeeded) === -1) {
      console.log("Insufficient funds.", fundsNeeded);

      this.setState({
        message: {
          show: true,
          type: "error",
          transaction: "purchased",
          btc: btcBought,
          userBalance: user.usd,
          isCurrency: true,
          needed: Math.abs(fundsNeeded),
          total
        }
      });
    } else {
      console.log("Sufficient funds.", fundsNeeded);

      this.setState(prevState => ({
        message: {
          show: true,
          type: "success",
          transaction: "purchased",
          isCurrency: true,
          btc: btcBought,
          total
        },
        user: {
          ...user,
          btc: increaseBalance(prevState.user.btc, btcBought),
          usd: decreaseBalance(prevState.user.usd, total)
        }
      }));
    }
  };

  pollPrice = () =>
    fetchData(this.props.api).then(({ USD: currentExchangeRate }) => {
      this.setState(prevState => {
        const priceChanged = currentExchangeRate !== prevState.exchangeRate;

        const lastPrice = !prevState.ticker.lastPrice
          ? currentExchangeRate
          : priceChanged
          ? prevState.exchangeRate
          : prevState.ticker.lastPrice;

        const changed = priceChange(currentExchangeRate, lastPrice);

        const indicator = Math.sign(changed) === -1 ? "loss" : "gain";

        const rate = {
          exchangeRate: currentExchangeRate,
          ticker: {
            lastPrice,
            changed,
            indicator
          },
          animation: priceChanged ? "updating" : ""
        };
        log(
          `Poll Rate ${
            indicator === "gain" ? "\u25B2" : "\u25BC"
          } ${indicator}`,
          rate
        );
        return rate;
      });
    });

  setCosts = transactionType => {
    const buying = transactionType === "buy";

    this.setState(prevState => {
      const fees = buying ? getFees(prevState.usd) : 0;
      const total = getTotalCost(prevState.usd, fees);

      const costs = {
        exceedsCoinsError:
          prevState.user.btc < prevState.btc || prevState.user.btc === 0,
        exceedsUsdError: prevState.user.usd < total || prevState.user.usd === 0,
        fees,
        total
      };

      log(`[${transactionType}] Set Costs`, { ...costs, ...prevState });

      return costs;
    });
  };

  getBTC = () => {
    this.setState(prevState => ({
      btc: prevState.usd ? toBTC(prevState.usd, prevState.exchangeRate) : null
    }));
  };

  getUSD = () => {
    this.setState(prevState => ({
      usd: prevState.btc ? toUSD(prevState.btc, prevState.exchangeRate) : null
    }));
  };

  setUSD = ({ floatValue: usd }, transactionType) => {
    this.setState({ usd }, this.setCosts.bind(this, transactionType));
  };

  setBTC = ({ floatValue: btc }, transactionType) => {
    this.setState({ btc }, this.setCosts.bind(this, transactionType));
  };

  decreaseLimit = () => {
    this.setState(
      prevState => ({
        limit: Math.max(0, prevState.limit - this.LIMIT_MIN)
      }),
      () => this.setState(prevState => ({ usd: prevState.limit }))
    );
  };

  increaseLimit = () => {
    this.setState(
      prevState => ({
        limit: Math.min(prevState.user.usd, prevState.limit + this.LIMIT_MIN)
      }),
      () => this.setState(prevState => ({ usd: prevState.limit }))
    );
  };

  init() {
    if (this.state.exchangeRate) {
      this.getUSD();
      this.getBTC();
      this.setCosts("buy");
      this.setCosts("sell");
    }
  }
  componentDidMount() {
    this.pollPrice();
    this.init();

    this.pollPriceInterval = setInterval(
      this.pollPrice,
      this.CHECK_PRICE_INTERVAL
    );
  }

  componentWillUnmount() {
    clearInterval(this.pollPriceInterval);
  }

  render() {
    const { animation, exchangeRate, user, message } = this.state;

    const transactionFormSetup = {
      user,
      fees: this.state.fees,
      total: this.state.total,
      usdField: {
        label: "usd",
        blur: this.getBTC,
        change: this.setUSD,
        value: this.state.usd,
        error: this.state.exceedsUsdError
      },

      btcField: {
        label: "btc",
        blur: this.getUSD,
        change: this.setBTC,
        value: this.state.btc,
        decimals: 3,
        error: this.state.exceedsCoinsError
      },

      limitField: {
        up: this.increaseLimit,
        down: this.decreaseLimit,
        value: this.state.limit
      }
    };

    return (
      <section className="flex app">
        <AccountHeader user={user} />
        <AppHeader
          exchangeRate={exchangeRate}
          animation={animation}
          {...this.state.ticker}
        />
        <Balance {...user} />
        {exchangeRate ? (
          <AppRoutes
            buy={this.buy}
            sell={this.sell}
            {...transactionFormSetup}
            {...this.props}
          />
        ) : (
          <Loader />
        )}

        {message && <Message {...message} />}
      </section>
    );
  }
}

export default App;
