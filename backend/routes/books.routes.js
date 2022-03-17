var express = require("express");
var router = express.Router();
var booksController = require("../controllers/books.controller");
var authController = require("../middleware/auth.controller");

router.post("/add", authController.validToken, booksController.add);

router.post("/all", authController.validToken, booksController.alll);

router.post(
  "/change",
  authController.validToken,
  authController.isEmployeeAdmin,
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
router.get(
  "/",
  authController.validToken,
  authController.isEmployee,
  booksController.findAll
);
router.get(
  "/toExpensive",
  authController.validToken,
  authController.isAdmin,
  booksController.toExpensive
);
router.put(
    "/update/:id",
    booksController.upDateBook
);

module.exports = router;
