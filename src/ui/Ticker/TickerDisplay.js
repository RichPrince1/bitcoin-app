import React, { Component } from "react";
import { priceChange } from "utils/helpers";

class TickerDisplay extends Component {
  state = {
    exchangeRate: this.props.exchangeRate,
    changed: 0,
    indicator: null
  };

  static getDerivedStateFromProps(props, state) {
    const priceChanged = props.exchangeRate !== state.exchangeRate;

    if (priceChanged) {
      const changed = priceChange(props.exchangeRate, state.exchangeRate);
      const indicator = Math.sign(changed) === -1 ? "loss" : "gain";

      console.log(`
        current: ${props.exchangeRate}
        lastPrice: ${state.exchangeRate}
        indicator: ${indicator}
        changed: ${changed}
      `);

      return {
        exchangeRate: props.exchangeRate,
        indicator,
        changed,
        animation: priceChanged ? "updating" : ""
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  render() {
    const { exchangeRate, indicator, changed, animation } = this.state;
    const indicatorSymbol =
      !changed || changed === 0 ? "indicator" : `indicator ${indicator}`;
    const percentChanged = Math.abs(changed).toFixed(2);

    return (
      <>
        <div className={`flex ${animation}`}>
          <p className={`cost ${animation}`}>${exchangeRate} </p>
          <p className={`flex percentage ${animation}`}>
            <div className={indicatorSymbol}>
              <span>{percentChanged}%</span>
            </div>
          </p>
        </div>
      </>
    );
  }
}

export default TickerDisplay;
