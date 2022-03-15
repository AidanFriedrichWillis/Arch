const router = require("express").Router();
let Book = require("../models/book");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.route("/add").post(async (req, res) => {
  const decodeT = jwt.verify(req.body.token, "Yasuo123");

  if (decodeT) {
    const bookName = req.body.bookName;
    const cost = req.body.cost;
    const auth = req.body.auth;
    const userid = req.body.userid;
    const toExpensive = req.body.toExpensive;
    const denied = req.body.denied;
    const moreInfo = req.body.moreInfo;
    const newBook = new Book({
      bookName,
      cost,
      auth,
      toExpensive,
      userid,
      denied,
      moreInfo,
    });

    newBook
      .save()
      .then(() => res.json("book req Succ"))
      .catch((err) => res.status(400).json("book req Error: " + err));
  } else {
    (err) => res.status(401).json(err);
  }
});

router.route("/all").post(async (req, res) => {
  const decodeT = jwt.verify(req.body.token, "Yasuo123");
  if (decodeT) {
    const returnb = await Book.find({
      userid: req.body.userid,
    });

    if (returnb) {
      return res.json(returnb);
    } else {
      res.json("no book");
    }
  } else {
    (err) => res.status(401).json(err);
  }
});
router.route("/change").post(async (req, res) => {
  const decodeT = jwt.verify(req.body.token, "Yasuo123");
  if (decodeT) {
    try {
      const book = await Book.findOne({
        _id: req.body._id,
      });
      if (book.toExpensive) {
        book.toExpensive = false;
      } else {
        book.toExpensive = true;
      }

      await book.save();
      res.send(book);
    } catch {
      res.send({ error: "failed to update tooexpensize" });
    }
  } else {
    (err) => res.status(401).json(err);
  }
});

router.route("/changeAuth").post(async (req, res) => {
  const decodeT = jwt.verify(req.body.token, "Yasuo123");
  if (decodeT) {
    try {
      const book = await Book.findOne({
        _id: req.body._id,
      });
      book.auth = true;
      await book.save();
      res.send(book);
    } catch {
      res.send({ error: "failed to update auth" });
    }
  } else {
    (err) => res.status(401).json(err);
  }
});

router.route("/denied").post(async (req, res) => {
  const decodeT = jwt.verify(req.body.token, "Yasuo123");
  if (decodeT) {
    const user = jwt.decode(req.body.token);

    if (user.rank == "Admin") {
      try {
        const book = await Book.findOne({
          _id: req.body._id,
        });
        book.denied = true;
        await book.save();
        res.send(book);
      } catch {
        res.send({ error: "failed to update auth" });
      }
    } else {
      res.send({ error: "YOu aint admin" });
    }
  } else {
    (err) => res.status(401).json(err);
  }
});

router.route("/").get((req, res) => {
  Book.find({ auth: false, toExpensive: false })
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/toExpensive").get((req, res) => {
  Book.find({ toExpensive: true })
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
