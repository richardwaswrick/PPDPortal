import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LoginMessage extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  render() {
    return <p>Please click the login link above to sign in.</p>;
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, profile } = state.auth;
  return {
    isAuthenticated,
    profile
  };
}

export default connect(mapStateToProps)(withRouter(LoginMessage));
