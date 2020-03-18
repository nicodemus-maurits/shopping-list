import React from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

import { logout } from "../../store/actions/authActions";

const Logout = props => {
  return (
    <>
      <NavLink onClick={props.onLogout} href="#">
        Logout
      </NavLink>
    </>
  );
};

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
