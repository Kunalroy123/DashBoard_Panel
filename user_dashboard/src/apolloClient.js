import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/query", // your Go backend
  cache: new InMemoryCache(),
});

export default client;
