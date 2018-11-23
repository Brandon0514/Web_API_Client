import React, { Component } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

import { withRouter } from 'react-router-dom';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  state = {
    isOpen: false
  };

  logout(e) {
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.props.history.push(`https://damp-garden-38136.herokuapp.com/`);
  }

  render() {
    const loginRegLink = (
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="https://damp-garden-38136.herokuapp.com/">
            <img
              alt="My Logo"
              src={'favicon.ico.png'}
              style={{ width: 50, marginTop: -4, paddingRight: 10 }}
            />
            The Fox TV Series
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="navitem">
                <NavLink href="https://damp-garden-38136.herokuapp.com/login">Login</NavLink>
              </NavItem>
              <NavItem className="navitem">
                <NavLink href="https://damp-garden-38136.herokuapp.com/register">Resgiter</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );

    const userLogin = (
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="https://damp-garden-38136.herokuapp.com/SearchPage">
            <img
              alt="My Logo"
              src={'favicon.ico.png'}
              style={{ width: 50, marginTop: -4, paddingRight: 10 }}
            />
            The Fox TV Series
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="navitem">
                <NavLink href="https://damp-garden-38136.herokuapp.com/HomePage">Trending TV</NavLink>
              </NavItem>
              <NavItem className="navitem">
                <NavLink href="https://damp-garden-38136.herokuapp.com/SearchPage">Search</NavLink>
              </NavItem>
              <NavItem className="navitem">
                <NavLink href="https://damp-garden-38136.herokuapp.com/FavoritePage">Favorite</NavLink>
              </NavItem>
              <NavItem className="navitem">
                <NavLink href="https://damp-garden-38136.herokuapp.com/profile">Profile</NavLink>
              </NavItem>
              <NavItem className="navitem">
                <NavLink href="https://damp-garden-38136.herokuapp.com/About">About</NavLink>
              </NavItem>
              <NavItem className="navitem">
                <NavLink id="navitem" href="" onClick={this.logout}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );

    return <div>{localStorage.usertoken ? userLogin : loginRegLink}</div>;
  }
}

export default withRouter(AppNavbar);
