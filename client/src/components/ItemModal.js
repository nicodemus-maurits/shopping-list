import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { addItem } from "../store/actions/itemActions";

const ItemModal = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newItem = { name };
    props.onAddItem(newItem);
    setName("");
    toggle();
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAddItem: newItem => dispatch(addItem(newItem))
  };
};

export default connect(null, mapDispatchToProps)(ItemModal);
