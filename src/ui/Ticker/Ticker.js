import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import TickerDisplay from "ui/Ticker/TickerDisplay";

const getBTCExchange = gql`
  query exchangeRate($pathBuilder: String) {
    exchange(type: "Exchange", pathBuilder: $pathBuilder)
      @rest(type: "Currency", path: "?{args.pathBuilder}") {
      USD
    }
  }
`;

const Ticker = () => (
  <Query
    query={getBTCExchange}
    pollInterval={1000}
    variables={{
      pathBuilder: `fsym=BTC&tsyms=BTC,USD`
    }}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error: {error}</p>;
      console.log("data", data);

      return <TickerDisplay exchangeRate={data.exchange.USD} />;
    }}
  </Query>
);

export default Ticker;
