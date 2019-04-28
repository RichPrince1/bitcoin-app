import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import apolloClientLayer from 'apollo-layer/';

// Styles
import 'styles/reset.css';
import 'styles/theme.css';
import 'styles/base.css';
import 'styles/layout.css';
import 'styles/background.css';
import 'styles/message.css';
import 'styles/animation.css';
import 'styles/route-animations.css';
import 'styles/menu.css';
import 'styles/field.css';
import 'styles/costs.css';
import 'styles/transactions.css';
import 'styles/ticker.css';
import 'styles/style.css';
import 'styles/responsive.css';

// Main Component
import App from 'ui/App/ui';
const API_ENDPOINT = `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,USD`;

const Application = () => (
  <ApolloProvider client={apolloClientLayer}>
    <Router>
      <App api={API_ENDPOINT} />
    </Router>
  </ApolloProvider>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<Application />, rootElement);
