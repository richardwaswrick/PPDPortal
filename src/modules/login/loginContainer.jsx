import React, { Component } from "react";
import { connect } from "react-redux";
import { login, logout } from "./loginAction";
import LoginComponent from "./loginComponent";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.props.login();
  }

  handleLogoutClick() {
    this.props.logout();
  }

  render() {
    const { isAuthenticated, profile } = this.props;

    return (
      <LoginComponent
        isAuthenticated={isAuthenticated}
        onLoginClick={this.handleLoginClick}
        onLogoutClick={this.handleLogoutClick}
        profile={profile}
      />
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

export default connect(
  mapStateToProps,
  {
    login,
    logout
  }
)(Login);
