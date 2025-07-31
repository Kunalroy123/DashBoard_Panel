import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://dashboard-panel-5nit.onrender.com/query", // your Go backend
  cache: new InMemoryCache(),
});

export default client;
