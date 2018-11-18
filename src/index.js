import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "../node_modules/toastr/build/toastr.min.css";
import "./index.css";
import App from "./components/app";
import history from "./history";
import { ApolloProvider } from "react-apollo";
import { graphqlClient } from "./api/apolloClient";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const store = configureStore();

render(
  <ApolloProvider client={graphqlClient}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("app")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
