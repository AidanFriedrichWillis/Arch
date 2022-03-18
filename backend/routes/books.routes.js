var express = require("express");
var router = express.Router();
var booksController = require("../controllers/books.controller");
var authController = require("../middleware/auth.controller");

router.post("/add", authController.validToken, booksController.add);

router.get("/allforuser/:id", authController.validToken, booksController.alll);

router.put(
  "/change/:id",
  authController.validToken,
  authController.isEmployeeAdmin,
  booksController.change
);
router.put(
  "/changeAuth/:id",
  authController.validToken,
  authController.isEmployee,
  booksController.changeAuth
);
router.put(
  "/denied/:id",
  authController.validToken,
  authController.isAdmin,
  booksController.denied
);
router.put(
  "/moreInfo/:id",
  authController.validToken,
  authController.isEmployee,
  booksController.moreInfo
);
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
router.put("/update/:id", booksController.upDateBook);

router.delete("/delete/:id", authController.validToken, authController.isAdmin, booksController.deleteWhere);

module.exports = router;
