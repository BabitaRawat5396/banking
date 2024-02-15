const express = require("express");
const router = express.Router();

// Importing controllers
const {
  addAmount,
  transferAmount,
  getAllTransactions,
  getTotalBalance,
} = require("../controller/transaction");

const { auth } = require("../middleware/auth");

router.post("/addAmount", auth, addAmount);
router.get("/getAllTransactions", auth, getAllTransactions);
router.post("/transferAmount", auth, transferAmount);
router.get("/totalBalance", getTotalBalance);
// Exporting user related routers
module.exports = router;
