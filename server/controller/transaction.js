// const User = require("../model/user");
const Transaction = require("../model/transaction");

exports.addAmount = async (req, res) => {
  try {
    // Destructuring data
    const { amount, accountType } = req.body;
    // Data Not Found
    if (!amount && !accountType) {
      res.json({
        success: false,
        message: "All Fields are required.",
      });
    }

    const transaction = await Transaction.create({
      amount,
      accountType,
      transactionType: "Deposit",
    });

    return res.status(200).json({
      success: true,
      transaction,
      message: "Successful transaction",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Transaction Error.",
      error: error.message,
    });
  }
};

exports.transferAmount = async (req, res) => {
  try {
    // Destructuring data
    const { amount, accountType } = req.body;
    // Data Not Found
    if (!amount && !accountType) {
      res.json({
        success: false,
        message: "All Fields are required.",
      });
    }

    const depositTransaction = await Transaction.create({
      amount,
      accountType,
      transactionType: "Deposit",
    });

    // Create a withdrawal transaction
    const withdrawalTransaction = await Transaction.create({
      amount,
      accountType: accountType === "Checking" ? "Savings" : "Checking", // Opposite account type
      transactionType: "Withdraw",
    });

    return res.status(200).json({
      success: true,
      depositTransaction,
      withdrawalTransaction,
      message: "Successful transaction",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Transaction Error.",
      error: error.message,
    });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All Transaction are fetched successfully",
      allTransactions,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `unable to fetch all transactions`,
      error: error.message,
    });
  }
};

exports.getTotalBalance = async (req, res) => {
  try {
    // Find all transactions
    const allTransactions = await Transaction.find({});

    // Calculate total balance
    const totalBalance = allTransactions.reduce((acc, transaction) => {
      if (transaction.transactionType === "Deposit") {
        return acc + transaction.amount;
      } else {
        return acc;
      }
    }, 0);

    return res.status(200).json({
      success: true,
      message: "Total balance calculated successfully",
      totalBalance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error calculating total balance",
      error: error.message,
    });
  }
};
