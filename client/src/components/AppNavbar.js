import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem
} from "reactstrap";

import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

const AppNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const authLinks = (
    <>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {props.auth.user && `Welcome ${props.auth.user.name}`}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {props.auth.isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AppNavbar);
