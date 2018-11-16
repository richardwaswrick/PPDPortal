import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const jwt = cookies.get("id_token");

if (!jwt) {
  // throw new Error("jwt is undefined");
}

const httpLink = createHttpLink({
  uri: "http://localhost:7071/graphql"
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: "Bearer " + jwt
    }
  };
});

export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


