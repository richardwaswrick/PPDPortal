import React from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import routes from "../routes";

class App extends React.Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { errorMessage } = this.props;

    const contentStyle = {
      paddingleft: 30,
      paddingright: 30,
      paddingtop: 20
    };

    return (
      <div className="container">
        <p>{errorMessage}</p>
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
  match: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  // console.log(state);
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    loading: state.ajaxCallsInProgress > 0,
    isAuthenticated,
    errorMessage
  };
}

export default connect(mapStateToProps)(App);
