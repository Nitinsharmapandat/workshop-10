const mongoose = require('mongoose');
const mongoSchema = mongoose.Schema;
const bcrypt = require('bcrypt');
const getToken = require('./getToken');

const userSchema = new mongoSchema({
  name: { type: String, require: true },
  password: { type: String, required: true }
}, { timestamps: true, versionKey: false });

const dbuserschema = mongoose.Schema(userSchema);
const UserModel = mongoose.model('user', dbuserschema);

function hash(password) {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

class user {

  createUser = (req, res) => {
    const newUser = new UserModel({
      name: req.body.name,
      password: hash(req.body.password)
    });
   

    newUser.save((err, data) => {
      if (data) {
        return res.status(200).send({ message: "User successfully registered" })
      } else {
        return res.status(500).send({ message: "Enter valid Details" })
      }
    })
    if(newUser){
      res.json({
        id:newUser._id,
        name:newUser.name,
        token:getToken(newUser._id)
      })
    }
  }

  loginUser = (userLogin, callback) => {
    UserModel.findOne({ name: userLogin.name }, callback)
  }
}

module.exports = new user()