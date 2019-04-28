import { ApolloClient } from "apollo-client";
import { RestLink } from "apollo-link-rest";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";

const _l = str => JSON.stringify(str, null, 2);
const logError = (type, { message, locations, path, ...more }) => {
  console.log(
    `
      [${type} error]: 
          Path: ${path}
          Message: ${_l(message)}, 
          Location: ${_l(locations)},
    `
  );
};
const logNetError = (type, { message, ...more }) => {
  console.log(`[${type} error]: Message: ${_l(message)}`);
};

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.map(err => logError("GraphQL", err));
  if (networkError) logNetError("Network", networkError);
});

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: {
    currentPageName: "Bitcoin"
  },
  resolvers: {}
});
const CRYPTOCOMPARE_BASE_URL = "https://min-api.cryptocompare.com/data/price";

const restLink = new RestLink({
  uri: CRYPTOCOMPARE_BASE_URL
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, stateLink, restLink])
});

export default client;
