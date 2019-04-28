import React from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Components
import TransactionForm from "ui/TransactionForm/ui";

const AnimateRoutes = ({ location, children }) => (
  <TransitionGroup className="transition-group">
    <CSSTransition
      key={location.key}
      timeout={{ enter: 300, exit: 300 }}
      classNames={"fade"}
    >
      {children}
    </CSSTransition>
  </TransitionGroup>
);

export const Menu = () => (
  <nav className="flex-around menu">
    <Link to="/buy">Buy</Link>
    <Link to="/sell">Sell</Link>
  </nav>
);

const AppRoutes = ({ buy, sell, location, ...props }) => (
  <AnimateRoutes location={location}>
    <section className="route-section">
      <Switch location={location}>
        <Route
          exact
          path="/buy"
          render={() => (
            <TransactionForm transactionType="buy" onSubmit={buy} {...props} />
          )}
        />

        <Route
          exact
          path="/sell"
          render={() => (
            <TransactionForm
              transactionType="sell"
              onSubmit={sell}
              {...props}
            />
          )}
        />
      </Switch>
    </section>
  </AnimateRoutes>
);

export default withRouter(AppRoutes);
