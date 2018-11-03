import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  // NavItem,
  // NavLink,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  // renderSignOut() {
  //   if (this.props.authenticated) {
  //     return (
  //       <NavItem>
  //         <NavLink href="/">Sign Out</NavLink>
  //       </NavItem>
  //     );
  //   }
  // }

  renderNav() {
    if (this.props.authenticated) {
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
            {/* {this.renderSignOut()} */}
          </Nav>
        </Collapse>
      );
    }
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
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(
  mapStateToProps
  // actions
)(Header);
