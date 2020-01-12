const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("../config/keys").storagePath;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});
const upload = multer({ storage: storage });

const User = require("../models/User");
const Album = require("../models/Album");
const Photo = require("../models/Photo");
const Like = require("../models/Like");

//Upload image
router.post(
  "/uploadImage",
  upload.single("imageFile"),
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    let albumId;
    let user = req.body.userId;
    let tags = req.body.tags === "" ? [] : req.body.tags.split(",");

    if (req.body.newAlbum !== "") {
      let newAlbum = await Album.create({
        name: req.body.newAlbum,
        user: user
      });
      albumId = newAlbum._id;
      await User.findOneAndUpdate(
        { _id: user },
        { $push: { albums: albumId } }
      );
    } else albumId = req.body.album;

    let newPhoto = await Photo.create({
      description: req.body.description,
      user: user,
      tags: tags,
      link: req.file.filename,
      album: albumId
    });

    let like = await Like.create({
      photo: newPhoto._id,
      users: []
    });

    newPhoto.like = like._id;
    newPhoto.save();

    await Album.findOneAndUpdate(
      { _id: albumId },
      { $push: { photos: newPhoto._id } }
    );

    return res.status(201).json({
      success: true,
      msg: "A new photo was successfully uploaded"
    });
  }
);

//Search all photos, albums, users by query
router.get("/search/(:query)?", function(req, res, next) {
  let query = req.params.query ? req.params.query : "*";
  let sorting = req.query.sort;
  let filter = req.query.filter;
  console.log(query, sorting, filter);

  let sort = sortingQuery(sorting);

  let photos = new Promise(resolve => {
    if (query === "*") {
      Photo.find({})
        .populate({path: "like", select: "count"})
        .populate("user").sort(sort)
        .exec(function(err, photos) {
          if (err) return next(err);
          if (photos) return resolve(photos);
        });
    } else {
      Photo.find({ tags: { $regex: query } })
        .populate({path: "like", select: "count"})
        .populate("user")
        .sort(sort)
        .exec(function(err, photos) {
          if (err) return next(err);
          if (photos) resolve(photos);
        });
    }
  });

  let users = new Promise(resolve => {
    if (query === "*") {
      User.find({}, function(err, users) {
        if (err) return next(err);
        if (users) resolve(users);
      });
    } else {
      User.find({ username: { $regex: query } }, function(err, users) {
        if (err) return next(err);
        if (users) resolve(users);
      });
    }
  });

  let albums = new Promise(resolve => {
    if (query === "*") {
      Album.find({}, function(err, albums) {
        if (err) return next(err);
        if (albums) resolve(albums);
      });
    } else {
      Album.find({ name: { $regex: query } }, function(err, albums) {
        if (err) return next(err);
        if (albums) resolve(albums);
      });
    }
  });

  return Promise.all([photos, users, albums]).then(array => {
    return res.status(200).json({
      success: true,
      msg: "returned searched results",
      photos: array[0],
      users: array[1],
      albums: array[2]
    });
  });
});

function sortingQuery(sorting) {
  if (sorting === "oldest") {
    return { date: 1 };
  } if (sorting === "likes") {
    return {likesCount: -1};
  } else return { date: -1 };
}

module.exports = router;
