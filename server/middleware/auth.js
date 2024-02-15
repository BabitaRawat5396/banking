const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    //fetching token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", ""); //as header automatically adds "Bearer " in the start of token
    //No Token Found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    //Token Verifing
    try {
      // It takes the JWT and a secret or public key as input and returns the decoded payload if the token is valid The verify function returns an object representing the decoded payload of the JWT if the token is successfully verified.
      const payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    // Send to Next Middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unable to verify token, please check again",
      error: error.message,
    });
  }
};
