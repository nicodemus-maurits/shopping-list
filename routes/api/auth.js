const express = require("express");
const router = express.Router();
const { authUser, authUserData } = require("../controllers/auth");
const auth = require("../../middleware/auth");

router.route("/").post(authUser);

router.route("/user").get(auth, authUserData);

module.exports = router;
