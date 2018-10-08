import React from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import routes from "../routes";

export default class App extends React.Component {
  render() {
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
              <BrowserRouter>
                <Switch>
                  {routes.map(props => (
                    <Route
                      key={props.key}
                      path={props.path}
                      component={props.component}
                    />
                  ))}
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
