import React, { useState } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ShoppingList = () => {
  const [items, setItems] = useState({
    items: [
      { id: 1, name: "Eggs" },
      { id: 2, name: "Milk" },
      { id: 3, name: "Steak" },
      { id: 4, name: "Water" }
    ]
  });

  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => {
          const name = prompt("Enter Item");
          if (name) {
            setItems({
              items: [...items.items, { id: 5, name }]
            });
          }
        }}
      >
        AddItem
      </Button>

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setItems({
                      items: items.items.filter(item => item.id !== id)
                    });
                  }}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
