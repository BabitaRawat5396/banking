const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: ["Checking", "Savings"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Withdraw", "Deposit"],
      required: true,
    },
    currentBalance: {
      type: Number,
    },
    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Transaction", transactionSchema);
