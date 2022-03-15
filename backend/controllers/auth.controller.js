const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
let User = require("../models/user");

module.exports.validPass = async (req, res, next) => {
    
  const user = await User.findOne({
    username: req.body.username,
  }).catch((err) => res.status(400).json("error" + err));
  var isPasswordValid = false;
  try {
    isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  } catch (error) {}

  if (user && isPasswordValid) {
    return next();
  } else {
    res.status(400).json("invalid password/username");
  }
};

module.exports.validToken = async (req, res, next) => {
     const token = req.body.token || req.headers["x-access-token"];
    if(token){
  const decodeT = jwt.verify(req.body.token, config.secret);

  if (decodeT) {
    console.log("yo");

    return next();
  } else {
    return res.status(401).send("Invalid Token");
  }}
  else{
      return res.status(401).send("no token");
  }
};

module.exports.isAdmin = async (req, res, next) => {
 
  const decodeT = jwt.verify(token, "Yasuo123");

  if (decodeT) {
    const user = jwt.decode(req.body.token);
    if (user.rank == "Admin") {
      return next();
    } else {
      res.send({ error: "NOT ADMIN ACCOUNT" });
    }
  } else {
    return res.status(401).send("Invalid Token");
  }

};

module.exports.isEmployee = async (req, res, next) => {
    
     
  const decodeT = jwt.verify(req.body.token, "Yasuo123");

  if (decodeT) {
    const user = jwt.decode(req.body.token);
    if (user.rank == "Employee") {
      return next();
    } else {
      res.send({ error: "NOT EMPLOYEE ACCOUNT" });
    }
  } 
};
