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
    return (
      <div className="container">
        <p>Please click the login link above to sign in.</p>
      </div>
    );
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
