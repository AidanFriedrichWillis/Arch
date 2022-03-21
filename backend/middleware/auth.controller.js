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

module.exports.isAdmin = async (req, res, next) => {
  const user = jwt.decode(req.body.token || req.headers.authorization);
  if (user.rank == "Admin") {
    return next();
  } else {
    res.send({ error: "NOT ADMIN ACCOUNT" });
  }
};

module.exports.isEmployee = async (req, res, next) => {
  const user = jwt.decode(req.body.token || req.headers.authorization);
  if (user.rank == "Employee") {
    return next();
  } else {
    res.send({ error: "NOT EMPLOYEE ACCOUNT" });
  }
};
module.exports.isEmployeeAdmin = async (req, res, next) => {
  const user = jwt.decode(req.body.token || req.headers.authorization);
  if (user.rank == "Employee" || user.rank == "Admin") {
    return next();
  } else {
    res.send({ error: "NOT EMPLOYEE/ADMIN ACCOUNT" });
  }
};


module.exports.matchUserID = async (req,res,next) => {
  
  const user = jwt.decode(req.body.token || req.headers.authorization);
  if(user._id == req.query.userid){
    return next();
  }
  else{
    res.send({error: "Can not match user id"})
  }


}