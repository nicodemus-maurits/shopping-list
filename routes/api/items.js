const express = require("express");
const router = express.Router();
const { getItems, addItem, deleteItem } = require("../controllers/items");
const auth = require("../../middleware/auth");

router
  .route("/")
  .get(getItems)
  .post(auth, addItem);

router.route("/:id").delete(auth, deleteItem);

module.exports = router;
