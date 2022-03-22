const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
let User = require("../models/user");

/*
MIDDLEWARE CONTROLLER FOR SECURITY PRIVILIDGES AND OPERATIONS,
CALLED WITHIN ROUTES 
*/

//RETURNS NEXT() IF PASSWORD IS VALID, OR GIVES ERROR MESSAGE
module.exports.validPass = async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username,
  }).catch((err) => res.status(404).json("error" + err));
  var isPasswordValid = false;
  try {
    isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  } catch (error) {
    res.status(500).send;
  }

  if (user && isPasswordValid) {
    return next();
  } else {
    res.status(400).json("invalid password/username");
  }
};
// RETURNS NEXT() IF TOKEN IS VALID
module.exports.validToken = async (req, res, next) => {
  let token = req.body.token || req.headers.authorization;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
  });
};
//RETURNS NEXT() IF REQUEST IS FROM ADMIN
module.exports.isAdmin = async (req, res, next) => {
  const user = jwt.decode(req.body.token || req.headers.authorization);
  if (user.rank == "Admin") {
    return next();
  } else {
    res.status(401).send({ error: "NOT ADMIN ACCOUNT" });
  }
};
//RETURNS NEXT() IF REQUEST IS FROM EMPLOYEE

module.exports.isEmployee = async (req, res, next) => {
  const user = jwt.decode(req.body.token || req.headers.authorization);
  if (user.rank == "Employee") {
    return next();
  } else {
    res.status(401).send({ error: "NOT EMPLOYEE ACCOUNT" });
  }
};
//RETURNS NEXT() IF REQUEST IS FROM ADMIN OR EMPLOYEE

module.exports.isEmployeeAdmin = async (req, res, next) => {
  const user = jwt.decode(req.body.token || req.headers.authorization);
  if (user.rank == "Employee" || user.rank == "Admin") {
    return next();
  } else {
    res.status(401).send({ error: "NOT EMPLOYEE/ADMIN ACCOUNT" });
  }
};
//RETURNS NEXT() IF USER MATCHES REQUESTS USERID 

module.exports.matchUserID = async (req, res, next) => {
  const user = jwt.decode(req.body.token || req.headers.authorization);
  if (user._id == req.query.userid) {
    return next();
  } else {
    res.status(403).send({ error: "Can not match user id" });
  }
};
