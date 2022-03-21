var express = require("express");
var router = express.Router();

//Require controller
var userController = require("../controllers/users.controller");
var authController = require("../middleware/auth.controller");
router.post("/add", userController.signup);

router.post("/find",authController.validPass, userController.signin);

router.get("/", authController.validToken,authController.isAdmin ,userController.findAll);

router.delete("/:id", authController.validToken,authController.isAdmin, userController.deleteUser);
router.put("/update/:id", authController.validToken,authController.validPass, userController.updateUser);
module.exports = router;
