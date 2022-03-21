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
  const id = req.params.id;
  const returnb = await Book.find({
    userid: id,
  });

  if (returnb) {
    return res.json(returnb);
  } else {
    res.json("no book");
  }
};
module.exports.change = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findOne({
      _id: id,
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
  const id = req.params.id;

  try {
    const book = await Book.findOne({
      _id: id,
    });
    book.auth = true;
    await book.save();
    res.send(book);
  } catch {
    res.send({ error: "failed to update auth" });
  }
};

module.exports.denied = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findOne({
      _id: id,
    });
    book.denied = true;
    await book.save();
    res.send(book);
  } catch {
    res.send({ error: "failed to update auth" });
  }
};
module.exports.moreInfo = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findOne({
      _id: id,
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
  Book.find({ auth: false, toExpensive: false, moreInfo: false })
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports.toExpensive = async (req, res) => {
  Book.find({ toExpensive: true, denied: false })
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports.deleteWhere = async (req, res) => {
  console.log("delete");
  const id = req.params.id;

  Book.deleteMany({ userid: id })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

module.exports.upDateBook = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  const newname = req.body.bookName;
  const cost = req.body.cost;
  Book.findByIdAndUpdate(
    id,
    { bookName: newname, cost: cost, moreInfo: false },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

module.exports.findBy = async (req, res) => {
  let searchQuery;
  const cost = req.query.cost;
  const bookName = req.query.bookName;
  console.log(bookName);
  if (bookName == "") {
    console.log("1");

    searchQuery = { cost: { $lt: cost } };
  } else if (req.query.cost == "") {
    console.log("2");

    searchQuery = { bookName: bookName };
  } else {
    console.log("3");

    searchQuery = {
      bookName: bookName,
      cost: { $lt: cost },
    };
  }
    console.log(searchQuery);

   await Book.find(searchQuery
    
  )
    .then(async (books) => await res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
};
