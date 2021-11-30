const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");

const getUsers = (req, res) => {
  User.find({}, function (err, users) {
    res.json(users);
  });
};
const getUser = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    res.json({ name: user.user.name, email: user.user.email });
  });
};
const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //jwt.destroy(token);
  res.json({ message: "logged out succesfully" });
};
const login = (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  User.findOne({ $or: [{ name: username }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: res,
          });
        }
        if (result) {
          const acessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ acessToken: acessToken });
        } else res.json({ message: "password doesn't match" });
      });
    } else res.json({ message: "User not found" });
  });
};
const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    user.save();
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
};
module.exports = {
  getUsers,
  getUser,
  login,
  logout,
  register,
};
