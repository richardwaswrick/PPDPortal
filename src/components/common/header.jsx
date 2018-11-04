import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { connect } from "react-redux";
import Login from "../../features/login/loginContainer";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  renderNav() {
    if (this.props.isAuthenticated) {
      return (
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="navbar navbar-expand-lg navbar-light bg-light" navbar>
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle tag="a" className="nav-link" caret>
                Administration
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="a" href="/admin/Entities">
                  Entities
                </DropdownItem>
                <DropdownItem tag="a" href="/admin/Tasks">
                  Tasks
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Login />
          </Nav>
        </Collapse>
      );
    }

    return (
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="navbar navbar-expand-lg navbar-light bg-light" navbar>
          <Login />
        </Nav>
      </Collapse>
    );
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/home">PPD Portal</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          {this.renderNav()}
        </Navbar>
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated
  };
}

export default connect(mapStateToProps)(Header);
