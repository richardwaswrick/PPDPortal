import React from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import { Route, Switch, Router } from "react-router-dom";
import routes from "../routes";
import history from "../history";
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";
import { loadTasks } from "../actions/taskActions";

const store = configureStore();

export default class App extends React.Component {
  render() {
    store.dispatch(loadTasks());

    const contentStyle = {
      paddingleft: 30,
      paddingright: 30,
      paddingtop: 20
    };

    return (
      <div>
        <Header />
        <div className="row">
          <div id="content" className="col-md-12" style={{ contentStyle }}>
            <div className="container">
              <Provider store={store}>
                <Router history={history}>
                  <Switch>
                    {routes.map(props => (
                      <Route
                        key={props.key}
                        path={props.path}
                        component={props.component}
                      />
                    ))}
                  </Switch>
                </Router>
              </Provider>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
