const User = require("../model/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // Destructuring data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      address,
      citizenship,
    } = req.body;

    // Data Not Found
    if (
      !firstName &&
      !lastName &&
      !email &&
      !password &&
      !confirmPassword &&
      !phone &&
      !address &&
      !citizenship
    ) {
      res.json({
        success: false,
        message: "All Fields are required.",
      });
    }

    // Comparing re-written passwords
    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        message: "Password do not match. Please try again.",
      });
    }

    //Password validation
    const isPassStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isPassStrong) {
      res.json({
        success: false,
        message: "Password is not strong",
      });
    }

    // Email Exist Validation
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    //Encrypt password

    // 1. generating salt
    const salt = await bcrypt.genSalt(10).catch((error) => {
      res.json({
        success: false,
        message: "Error occured while generating salt",
      });
    });
    // 2. hashing the password
    const hash = await bcrypt.hash(password, salt).catch(() => {
      res.json({
        success: false,
        message: "Error occured while generating salt",
      });
    });

    //Creating user entry
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      phone,
      address,
      citizenship,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failedx. Please try again.",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Fetch data
    const { email, password } = req.body;

    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `All Fields are Required`,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Login first",
      });
    }

    // Comparing  hashed password from database to inputted password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY_SECRET, {
        expiresIn: "24h",
      });

      if (!token) {
        res.json({
          success: false,
          message: "Token generation failed",
        });
      }

      // Storing token into the database
      user.token = token;
      user.password = undefined; //Protecting

      // Setting cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //expiration for 3 days
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login Failed`,
      error: error.message,
    });
  }
};
