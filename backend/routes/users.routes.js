var express = require("express");
var router = express.Router();

//Require controller
var userController = require("../controllers/users.controller");
var authController = require("../middleware/auth.controller");
router.post("/add", userController.signup);

router.post("/find",authController.validPass, userController.signin);

router.get("/", authController.validToken, userController.findAll);

router.delete("/delete", authController.validToken, userController.deleteUser);

module.exports = router;
