const { param, body, validationResult } = require("express-validator");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const userSignupValidator = [
  body("email", "invalid email format").isEmail(),
  body("password", "invalid password").isLength({ min: 6 }),
];
const sendErrorsToClient = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((error) => error.msg),
    });
  }
  next();
};
const emailUniqueness = (req, res, next) =>
  User.findOne({ $or: [{ email: req.body.email }] }).then((user) => {
    if (!user) {
      next();
    } else {
      return res.status(422).json({ errors: ["email already in use"] });
    }
  });

const checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  userSignupValidator,
  sendErrorsToClient,
  emailUniqueness,
  checkAuth,
};
