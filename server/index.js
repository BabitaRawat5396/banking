const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./route/user");
const transactionRoutes = require("./route/transaction");
const dotenv = require("dotenv");
const database = require("./config/database");
const PORT = process.env.PORT || 4000;
// loading global variables in process
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());

// Database connect
database.connect();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/account", transactionRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Activating the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
