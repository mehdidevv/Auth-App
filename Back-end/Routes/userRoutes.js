const express = require("express");
const userController = require("../controllers/userController");

const {
  userSignupValidator,
  sendErrorsToClient,
  emailUniqueness,
  checkAuth,
} = require("../validators/user");
const router = express.Router();

router.get("/users", checkAuth, userController.getUsers);
router.get("/user", checkAuth, userController.getUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

router.post(
  "/register",
  userSignupValidator,
  sendErrorsToClient,
  emailUniqueness,
  userController.register
);

module.exports = router;
