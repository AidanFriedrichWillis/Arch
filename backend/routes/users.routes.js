var express = require("express");
var router = express.Router();

//Require controller
var userController = require("../controllers/users.controller");
var authController = require("../controllers/auth.controller");
router.post("/add", userController.signup);

router.post("/find",authController.validPass, userController.signin);

// router.get("/users", userController.findAll);
router.get("/", authController.validToken, userController.findAll);


module.exports = router;
