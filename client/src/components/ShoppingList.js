import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import { getItems, deleteItem } from "../store/actions/itemActions";

const ShoppingList = props => {
  useEffect(() => {
    props.onGetItems();
  }, []);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {props.item.items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {props.isAuthenticated && (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => props.onDeleteItem(_id)}
                  >
                    &times;
                  </Button>
                )}

                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  onGetItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetItems: () => dispatch(getItems()),
    onDeleteItem: _id => dispatch(deleteItem(_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
