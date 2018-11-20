import React, { Component } from "react";
import { NavLink, NavItem } from "reactstrap";

export default class LoginComponent extends Component {
  render() {
    const { onLoginClick, onLogoutClick, isAuthenticated } = this.props;

    return (
      <NavItem>
        {!isAuthenticated ? (
          <NavLink active href="#" onClick={onLoginClick}>
            Sign In
          </NavLink>
        ) : (
          <NavLink active href="#" onClick={onLogoutClick}>
            Sign Out
          </NavLink>
        )}
      </NavItem>
    );
  }
}
