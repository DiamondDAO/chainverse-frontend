// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  // uri: "http://staging.chainverse.diamonds/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
