var express = require("express");
var router = express.Router();
var booksController = require("../controllers/books.controller");
var authController = require("../middleware/auth.controller");

/*

BOOK ROUTES, EACH ROUTE FOLLOWING RESTFUL API URLS,
USING MIDDLEWARE IN THE FORM OF AUTHENTICATION FOR EACH ROUTE

USING: POST, GET, PUT, DELETE
WITH CRUD OPERATIONS: CREATE, READ, UPDATE AND DELETE

*/


//POST,CREATE
router.post("/add", authController.validToken, booksController.add); 
//GET,READ
router.get("/allforuser/:id", authController.validToken, booksController.alll); 
//PUT,UPDATE
router.put(
  "/change/:id",
  authController.validToken,
  authController.isEmployeeAdmin,
  booksController.change
);
//PUT,UPDATE
router.put(
  "/changeAuth/:id",
  authController.validToken,
  authController.isEmployee,
  booksController.changeAuth
);
//PUT,UPDATE
router.put(
  "/denied/:id",
  authController.validToken,
  authController.isAdmin,
  booksController.denied
);
//PUT,UPDATE
router.put(
  "/moreInfo/:id",
  authController.validToken,
  authController.isEmployee,
  booksController.moreInfo
);
//GET,READ
router.get(
  "/",
  authController.validToken,
  authController.isEmployee,
  booksController.findAll
);
//GET,READ
router.get(
  "/toExpensive",
  authController.validToken,
  authController.isAdmin,
  booksController.toExpensive
);
//GET,READ
router.get(
  "/search",
  authController.validToken,
  authController.matchUserID,
  booksController.findBy
);
//PUT,UPDATE
router.put("/update/:id", booksController.upDateBook);
//DELETE, DELETE
router.delete(
  "/delete/:id",
  authController.validToken,
  authController.isAdmin,
  booksController.deleteWhere
);

module.exports = router;
