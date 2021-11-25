import React from "react"
import ReactDOM from "react-dom"
import apolloClient from "graphql/apolloClient"
import { ApolloProvider } from "@apollo/client"
import App from "./App"

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
)
