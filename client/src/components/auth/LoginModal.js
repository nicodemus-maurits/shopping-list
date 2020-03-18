import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";

const LoginModal = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (props.error.id === "LOGIN_FAIL") {
      setMessage(props.error.msg.msg);
    } else {
      setMessage(null);
    }

    // If authenticated, close modal
    if (isOpen) {
      if (props.isAuthenticated) {
        toggle();
      }
    }
  }, [props.error]);

  const toggle = () => {
    // Clear Error
    props.onClearErrors();

    setIsOpen(!isOpen);
  };

  const onSubmit = e => {
    e.preventDefault();

    const user = { email, password };

    props.onLogin(user);
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {message && <Alert color="danger">{message}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                className="mb-3"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <Label for="name">Password</Label>
              <Input
                className="mb-3"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  onClearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(login(user)),
    onClearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
