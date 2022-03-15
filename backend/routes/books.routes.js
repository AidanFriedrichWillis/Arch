var express = require("express");
var router = express.Router();
var booksController = require("../controllers/books.controller");
var authController = require("../controllers/auth.controller");

router.post("/add", authController.validToken, booksController.add);

router.post("/all", authController.validToken, booksController.alll);

router.post(
  "/change",
  authController.isEmployee || authController.isAdmin,
  authController.validToken,
  booksController.change
);
router.post(
  "/changeAuth",
  authController.validToken,
  authController.isEmployee,
  booksController.changeAuth
);
router.post(
  "/denied",
  authController.validToken,
  authController.isAdmin,
  booksController.denied
);
router.post(
  "/moreInfo",
  authController.validToken,
  authController.isEmployee,
  booksController.moreInfo
);
router.post("/find", authController.validToken, booksController.findone);
router.get("/", booksController.findAll);
router.get("/toExpensive", booksController.toExpensive);

module.exports = router;
