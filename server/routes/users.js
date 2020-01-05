const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

const SECRET_KEY = keys.secret;

let User = require("../models/User");

// User registration
router.post("/registration", async function(req, res, next) {
  let { fullName, username, password, passwordRepeat } = req.body;

  if (password !== passwordRepeat) {
    return res.status(400).json({
      msg: "Password do not match."
    });
  }

  //Check unique username
  let user = await User.findOne({ username: username });
  console.log(user);
  if (user) {
    return res.status(400).json({
      msg: "Username is already taken."
    });
  }

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
              user: user,
              token: `Bearer ${token}`,
              msg: "You are registered and loggen in."
            });
          }
        );
      });
    });
  });
});

// User login
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
              user: user,
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

//test get profile
router.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    let id = req.params.id;
    User.findOne({_id: id}, function(err, user) {
      if(err) return next(err);
      if(user) {
        return res.status(200).json({
          success: true,
          user: user
        })
      }
    })
  }
);

module.exports = router;
