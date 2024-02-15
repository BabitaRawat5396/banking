const express = require("express");
const router = express.Router();

// Importing controllers
const { signup, login } = require("../controller/auth");

router.post("/login", login);

router.post("/register", signup);

// Exporting user related routers
module.exports = router;
