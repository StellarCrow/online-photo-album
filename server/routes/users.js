const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

const SECRET_KEY = keys.secret;

let User = require("../models/User");
let Album = require("../models/Album");
let Photo = require("../models/Photo");

/* 
    Register a new user. Creates new User instance and default album
    @returns {JSON Object | Error} Object contains status, message, user, jwt-token |
     400 error password don't match | 400 username is already taken
*/
router.post("/registration", async function(req, res, next) {
  let { fullName, username, password, passwordRepeat } = req.body;

  if (password !== passwordRepeat) {
    return res.status(400).json({
      msg: "Password do not match."
    });
  }

  //Check unique username
  let user = await User.findOne({ username: username });
  if (user) {
    return res.status(400).json({
      msg: "Username is already taken."
    });
  }

  let newUser = await User.create({
    name: fullName,
    username: username,
    password: password
  });

  let album = await Album.create({
    name: "Default",
    user: newUser._id
  });

  await User.findByIdAndUpdate(newUser._id, { $push: { albums: album._id } });

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

/* 
    Log in user.
    @returns {JSON Object | Error} Object contains status, message, user, jwt-token 
    404 username is not found | 400 incorrect password
*/
router.post("/login", function(req, res) {
  User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      return res.status(400).json({
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
        return res.status(400).json({
          msg: "Incorrect password.",
          success: false
        });
      }
    });
  });
});

/* 
    Checks if user with username exists.
    @params {string} username - unique username
    @returns {JSON Object | Error} Object contains status, message | 400 username is already taken
*/
router.get("/exist/:username", function(req, res, next) {
  let username = req.params.username;
  User.findOne({ username: username }, function(err, user) {
    if (err) return next(err);
    if (user) {
      return res.status(400).json({
        success: false,
        msg: "This username is already taken."
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "This username is free."
      });
    }
  });
});

/* 
    Checks if user with username exists.
    @params {ObjectId} id - user id
    @returns {JSON Object | Error} Object contains status, message, user object, arrays of albums and photos,
    albums count, total likes | 404 user was not found
*/
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function(req, res, next) {
    let id = req.params.id;

    let user = await User.findOne({ _id: id }, function(err, user) {
      if (err) return next(err);
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "User was not found."
        });
      }
    });

    //get user's albums
    let albumsCount = await Album.countDocuments({ user: id });
    let albums = await Album.find(
      { user: id },
      { photos: { $slice: -3 } }
    ).populate("photos", function(err) {
      if (err) return next(err);
    });

    await Photo.find({ user: id })
      .populate("user")
      .sort({ date: -1 })
      .exec(function(err, photos) {
        if (err) return err;
        if (photos) {
          return res.status(200).json({
            success: true,
            msg: "User and his photos were found.",
            user: user,
            photos: photos,
            likes: user.likes.length || 0,
            albumsCount: albumsCount,
            albums: albums
          });
        }
      });
  }
);

/* 
    Finds all user's albums
    @params {ObjectId} id - user id
    @returns {JSON Object | Error} Object contains status, message, array of albums
    | 404 no albums were found
*/
router.get("/:id/albums", function(req, res, next) {
  let id = req.params.id;
  Album.find({ user: id }, { photos: { $slice: 3 } })
    .populate("photos")
    .exec(function(err, albums) {
      if (err) return next(err);
      if (albums) {
        return res.status(200).json({
          success: true,
          msg: "Successfully got user's albums",
          albums: albums
        });
      } else {
        return res.status(404).json({
          success: false,
          msg: "No albums were found"
        });
      }
    });
});

/* 
    Finds all user's photos
    @params {ObjectId} id - user id
    @returns {JSON Object | Error} Object contains status, message, array of photos
    | 404 no photos were found
*/
router.get("/:id/photos", function(req, res, next) {
  let id = req.params.id;
  console.log("MY ID " + id);
  Photo.find({ user: id }, function(err, photos) {
    if (err) return next(err);
    if (photos) {
      return res.status(200).json({
        success: true,
        msg: "Successfully got user's photos",
        photos: photos
      });
    } else {
      return res.status(404).json({
        success: true,
        msg: "No photos were found"
      });
    }
  });
});

/* 
    Finds info about user's album and all photos belonging to this album
    @params {ObjectId} id - user id
    @params {ObjectId} aid - album id
    @returns {JSON Object | Error} Object contains status, message, album object
    | 404 album was not found
*/
router.get("/:id/albums/:aid", async function(req, res, next) {
  let aid = req.params.aid;

  await Album.findById(aid)
    .populate("photos")
    .exec(function(err, album) {
      if (err) return next(err);
      if (album) {
        return res.status(200).json({
          success: true,
          msg: "Got album info and photos",
          album: album
        });
      } else {
        return res.status(404).json({
          success: true,
          msg: "Album was not found"
        });
      }
    });
});

module.exports = router;
