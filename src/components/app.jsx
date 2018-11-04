import React from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import { Route } from "react-router-dom";
import routes from "../routes";

class App extends React.Component {
  render() {
    const contentStyle = {
      paddingleft: 30,
      paddingright: 30,
      paddingtop: 20
    };

    return (
      <div className="container">
        <Header loading={this.props.loading} />
        <div className="row">
          <div id="content" className="col-md-12" style={{ contentStyle }}>
            <div className="container">
            {routes.map(props => (
              <Route
                key={props.key}
                path={props.path}
                component={props.component}
                exact={props.exact}
              />
            ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
