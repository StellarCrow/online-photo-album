const express = require("express");
const router = express.Router();

const Photo = require("../models/Photo");
const Like = require("../models/Like");

//Get Photo
router.get("/:id", async function(req, res, next) {
  let id = req.params.id;
  let likes = await Like.findOne({photo: id});
  
  await Photo.findById(id)
    .populate("user")
    .exec(function(err, photo) {
      if (err) return next(err);
      if (photo) {
        return res.status(200).json({
          success: true,
          msg: "Returned photo with user data",
          photo: photo,
          likesCount: likes.users.length
        });
      }
    });
});

//Get photo's Like status
router.get("/:id/:uid/like/status", function(req, res, next) {
  let image = req.params.id;
  let user = req.params.uid;
  console.log(`IM HERE`);
  
  Like.findOne({ photo: image, users: user }, function(err, like) {
    if (err) return next(err);
    if (like) {
      console.log(like);
      
      return res.status(200).json({
        success: true,
        msg: "User was found in image's likes",
        isLiked: true,
        totalCount: like.users.length
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "User was not found in image's likes",
        isLiked: false,
        totalCount: 0
      });
    }
  });
});

//Set like
router.post("/:id/like/set", function(req, res, next) {
  let id = req.params.id;
  let user = req.body.userId;

  Like.findOneAndUpdate({ photo: id }, { $push: { users: user } }, function(
    err,
    like
  ) {
    if (err) return next(err);
    if (like) {
      console.log(like.users);
      console.log(like.users.length);
      
      return res.status(200).json({
          success: true, 
          msg: "Like was successfully setted",
          isLiked: true,
          totalCount: like.users.length + 1
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
        return res.status(200).json({
            success: true, 
            msg: "Like was successfully deleted",
            isLiked: true,
            totalCount: like.users.length - 1
        })
      }
    });
  });

module.exports = router;
