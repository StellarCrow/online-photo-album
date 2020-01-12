const express = require("express");
const router = express.Router();

const Photo = require("../models/Photo");
const Like = require("../models/Like");

//Get Photo
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
      }
    });
});

//Get photo's Like status
router.get("/:id/:uid/like/status", async function(req, res, next) {
  let image = req.params.id;
  let user = req.params.uid;

  let photo = await Photo.findOne({_id: image});
  
  await Like.findOne({ photo: image, users: user }).exec( function(err, like) {
    if (err) return next(err);
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
});

//Set like
router.post("/:id/like/set", function(req, res, next) {
  let id = req.params.id;
  let user = req.body.userId;

  Like.findOneAndUpdate({ photo: id }, { $push: { users: user }}).exec(function(
    err,
    like
  ) {
    if (err) return next(err);
    if (like) {
      Photo.findOneAndUpdate({_id: id}, {$inc: {likesCount: 1}}, function(err, photo) {
        if(err) return next(err);
        if(photo) {
          return res.status(200).json({
            success: true, 
            msg: "Like was successfully setted",
            isLiked: true,
            totalCount: photo.likesCount + 1
        })
        }
      })
    }
  });
});

//delete like
router.post("/:id/like/delete", function(req, res, next) {
    let id = req.params.id;
    let user = req.body.userId;
  
    Like.findOneAndUpdate({ photo: id }, { $pull: { users: user } }, function(
      err,
      like
    ) {
      if (err) return next(err);
      if (like) {
        Photo.findOneAndUpdate({_id: id}, {$inc: {likesCount: -1}}, function(err, photo) {
          if(err) return next(err);
          if(photo) {
            return res.status(200).json({
              success: true, 
              msg: "Like was successfully deleted",
              isLiked: true,
              totalCount: photo.likesCount - 1
          })
          }
        })
      }
    });
  });

module.exports = router;
