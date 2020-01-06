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

//Upload image
router.post(
  "/uploadImage",
  upload.single("imageFile"),
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    let albumId;
    let user = req.body.userId;
    let tags = req.body.tags === "" ? [] : req.body.tags;
    
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

    await Album.findOneAndUpdate(
      { _id: albumId },
      { $push: { photos: newPhoto._id } }
    );

    return res.status(200).json({
      success: true,
      msg: "A new photo was successfully uploaded"
    });
  }
);

//Get Photo
router.get("/image/:id", function(req, res, next) {
  let id = req.params.id;
  Photo.findById(id)
    .populate("user")
    .exec(function(err, photo) {
      if (err) return next(err);
      if (photo) {
        return res.status(200).json({
          success: true,
          msg: "Returned photo with user data",
          photo: photo
        });
      }
    });
});

module.exports = router;
