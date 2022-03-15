let Book = require("../models/book");
const jwt = require("jsonwebtoken");

module.exports.add = async (req, res) => {
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
};

module.exports.alll = async (req, res) => {
  const returnb = await Book.find({
    userid: req.body.userid,
  });

  if (returnb) {
    return res.json(returnb);
  } else {
    res.json("no book");
  }
};
module.exports.change = async (req, res) => {
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
};

module.exports.changeAuth = async (req, res) => {
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
};

module.exports.denied = async (req, res) => {
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
};
module.exports.moreInfo = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.body._id,
    });
    book.moreInfo = true;
    await book.save();
    res.send(book);
  } catch {
    res.send({ error: "failed to update info" });
  }
};

module.exports.findone = async (req, res) => {
  Book.find({ userid: req.body.userid, bookName: req.body.bookName })
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
  (err) => res.status(401).json(err);
};

module.exports.findAll = async (req, res) => {
  Book.find({ auth: false, toExpensive: false })
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports.toExpensive = async (req, res) => {
  Book.find({ toExpensive: true })
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
};
