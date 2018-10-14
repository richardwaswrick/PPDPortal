import React from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
