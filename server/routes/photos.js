const express = require("express");
const router = express.Router();

const Photo = require("../models/Photo");
const User = require("../models/User");
const Like = require("../models/Like");

/* 
    Finds photo by ID in db
    @param {ObjectId} - photo id
    @returns {JSON Object | Error} Object contains status, message, photo with populated user, 
    total number of likes | 404 error
*/
router.get("/:id", async function(req, res, next) {
  let id = req.params.id;

  await Photo.findById(id)
    .populate("user")
    .exec(function(err, photo) {
      if (err) return next(err);
      if (photo) {
        return res.status(200).json({
          success: true,
          msg: "Returned photo with user data",
          photo: photo,
          likesCount: photo.likesCount
        });
      } else {
        return res.status(404).json({
          success: false,
          msg: "Photo not found."
        });
      }
    });
});

/* 
    Checks if user liked photo
    @param {id} - photo id
    @param {uid} - user id
    @returns {JSON Object} Object contains status, message, isLiked status, total count of likes
*/
router.get("/:id/:uid/like/status", async function(req, res, next) {
  let image = req.params.id;
  let user = req.params.uid;

  let photo = await Photo.findOne({ _id: image });
  try {
    await Like.findOne({ photo: image, users: user }).exec(function(err, like) {
      if (err) {
        return next(err);
      }
      if (like) {
        return res.status(200).json({
          success: true,
          msg: "User was found in image's likes",
          isLiked: true,
          totalCount: photo.likesCount
        });
      } else {
        return res.status(200).json({
          success: true,
          msg: "User was not found in image's likes",
          isLiked: false,
          totalCount: photo.likesCount
        });
      }
    });
  }
  catch(err) {
    return res.status(200).json({
      success: true,
      msg: "User was not found in image's likes",
      isLiked: false,
      totalCount: photo.likesCount
    });
  }
});

/* 
    Sets like. Only for registered users
    @param {id} - photo id
    @returns {JSON Object | Error} Object contains status, message, isLiked status, 
    total count of likes | 404 error
*/
router.post("/:id/like/set", async function(req, res, next) {
  let id = req.params.id;
  let user = req.body.userId;

  await User.updateOne({ _id: user }, { $push: { likes: id } });

  await Like.findOneAndUpdate({ photo: id }, { $push: { users: user } }).exec(
    function(err, like) {
      if (err) return next(err);
      if (like) {
        Photo.findOneAndUpdate(
          { _id: id },
          { $inc: { likesCount: 1 } },
          function(err, photo) {
            if (err) return next(err);
            if (photo) {
              return res.status(200).json({
                success: true,
                msg: "Like was successfully setted",
                isLiked: true,
                totalCount: photo.likesCount + 1
              });
            } else {
              return res.status(404).json({
                success: false,
                msg: "Photo was not found",
                isLiked: false
              });
            }
          }
        );
      }
    }
  );
});

/* 
    Deletes like. Only for registered users
    @param {id} - photo id
    @returns {JSON Object | Error} Object contains status, message, isLiked status, 
    total count of likes | 404 error
*/
router.post("/:id/like/delete", async function(req, res, next) {
  let id = req.params.id;
  let user = req.body.userId;

  await User.updateOne({ _id: user }, { $pull: { likes: id } });

  await Like.findOneAndUpdate(
    { photo: id },
    { $pull: { users: user } },
    function(err, like) {
      if (err) return next(err);
      if (like) {
        Photo.findOneAndUpdate(
          { _id: id },
          { $inc: { likesCount: -1 } },
          function(err, photo) {
            if (err) return next(err);
            if (photo) {
              return res.status(200).json({
                success: true,
                msg: "Like was successfully deleted",
                isLiked: true,
                totalCount: photo.likesCount - 1
              });
            } else {
              return res.status(404).json({
                success: true,
                msg: "Photo was not found.",
                isLiked: true
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
