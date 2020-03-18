import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { loadUser } from "./store/actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(props) {
  useEffect(() => {
    props.onLoadUser();
  }, []);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadUser: () => dispatch(loadUser())
  };
};

export default connect(null, mapDispatchToProps)(App);
