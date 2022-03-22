var express = require("express");
var router = express.Router();

var userController = require("../controllers/users.controller");
var authController = require("../middleware/auth.controller");


/*

BOOK ROUTES, EACH ROUTE FOLLOWING RESTFUL API URLS,
USING MIDDLEWARE IN THE FORM OF AUTHENTICATION FOR EACH ROUTE

USING: POST, GET, PUT, DELETE
WITH CRUD OPERATIONS: CREATE, READ, UPDATE AND DELETE

*/



//POST,CREATE
router.post("/add", userController.signup);
//POST,CREATE 
router.post("/find", authController.validPass, userController.signin);
//GET,READ
router.get(
  "/",
  authController.validToken,
  authController.isAdmin,
  userController.findAll
);
//DELETE,DELETE
router.delete(
  "/:id",
  authController.validToken,
  authController.isAdmin,
  userController.deleteUser
);
//PUT,UPDATE
router.put(
  "/update/:id",
  authController.validToken,
  authController.validPass,
  userController.updateUser
);
module.exports = router;
