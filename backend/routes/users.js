const router = require('express').Router();
let User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async(req, res) => {
  var password = req.body.password;
  password = await bcrypt.hash(password,10);
  const rank = req.body.rank
  const username = req.body.username;

  const newUser = new User({username,password,rank});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find').post(async(req, res) => {
  const user = await User.findOne({
    username: req.body.username
 
  })
  var isPasswordValid = false
    try {
      isPasswordValid = await bcrypt.compare(req.body.password,user.password)

      
    } catch (error) {
      
    }  


  if(user&&isPasswordValid){

    const token = jwt.sign({
        username: req.body.username,
        rank: user.rank,
        id: user._id,
    }, 'Yasuo123')

    return res.json({status:'ok', user:token})
  }
  else{
    return res.json({status:'error', user:false})

  }


});





module.exports = router;
