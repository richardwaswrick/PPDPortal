import React from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
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
          <NavbarBrand href="/">PPD Portal</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>        
            <Nav className="navbar navbar-expand-lg navbar-light bg-light" navbar>
              <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                  Administration
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Entities</DropdownItem>
                  <DropdownItem header>Tasks</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>  
        </Navbar>      
      </div>
    );
  }
}