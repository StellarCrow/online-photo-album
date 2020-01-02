const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

const MONGO_URI = keys.mongoURI;
const SECRET_KEY = keys.secret;

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
console.log(mongoose.connection.readyState);

let User = require("../models/User");

// User registration

router.post("/registration", function(req, res, next) {
  let { fullName, username, password, passwordRepeat } = req.body;

  if (password !== passwordRepeat) {
    return res.status(400).json({
      msg: "Password do not match."
    });
  }

  //Check unique username
  User.findOne({ username: username }).then(user => {
    if (user) {
      return res.status(400).json({
        msg: "Username is already taken."
      });
    }
  })

  let newUser = new User({
    name: fullName,
    username,
    password
  });

  //Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) return next(err);
      newUser.password = hash;
      newUser.save().then(user => {
        return res.status(201).json({
          success: true,
          msg: "New user is now registered."
        });
      });
    });
  });
});

//user login

router.post("/login", function(req, res) {
  User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      return res.status(404).json({
        msg: "Username is not found.",
        success: false
      });
    }
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          _id: user._id,
          name: user.name,
          username: user.username
        };
        jwt.sign(
          payload,
          SECRET_KEY,
          { expiresIn: 60 * 60 * 24 * 7 },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              msg: "You are loggen in."
            });
          }
        );
      } else {
        return res.status(404).json({
          msg: "Incorrect password.",
          success: false
        });
      }
    });
  });
});

module.exports = router;
