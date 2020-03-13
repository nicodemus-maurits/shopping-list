const express = require("express");
const router = express.Router();
const { getItems, addItem, deleteItem } = require("../controllers/items");

router
  .route("/")
  .get(getItems)
  .post(addItem);

router.route("/:id").delete(deleteItem);

module.exports = router;
