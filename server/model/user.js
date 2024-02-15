const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, // any leading or trailing whitespace characters are removed
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: true,
      trim: true,
    },
    citizenship: {
      type: String,
      default: true,
    },
    token: {
      type: String,
    },
    accountId: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactionSchema",
        required: true,
      },
    ],

    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User", userSchema);
