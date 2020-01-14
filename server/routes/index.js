const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("../config/keys").storagePath;
const paginate = require("jw-paginate");

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
router.get("/search/(:query)?", async function(req, res) {
  let query = req.params.query || "";
  let sorting = req.query.sort;
  let page = req.query.page || 1;
  const pageSize = 10;

  let sort = sortingQuery(sorting);

  let albumsCount = await getDocumentsCount(Album, {
    name: { $exists: true, $regex: query }
  });
  let usersCount = await getDocumentsCount(User, {
    username: { $exists: true, $regex: query }
  });
  let photosCount = await getDocumentsCount(Photo, {
    tags: { $exists: true, $regex: query }
  });

  let pagerAlbums = paginate(albumsCount, page, pageSize);
  let pagerUsers = paginate(usersCount, page, pageSize);
  let pagerPhotos = paginate(photosCount, page, pageSize);

  let users = await findDocumentsPaginated(
    User,
    {
      username: { $exists: true, $regex: query }
    },
    pagerUsers
  );
  let albums = await findDocumentsPaginated(
    Album,
    {
      name: { $exists: true, $regex: query }
    },
    pagerAlbums
  );
  let photos = await findPhotos(
    { tags: { $exists: true, $regex: query } },
    pagerPhotos,
    sort
  );

  return res.status(200).json({
    success: true,
    msg: "searched results",
    photos: photos,
    albums: albums,
    users: users,
    pagerAlbums: pagerAlbums,
    pagerPhotos: pagerPhotos,
    pagerUsers: pagerUsers
  });
});

function getDocumentsCount(model, query) {
  return new Promise(resolve => {
    resolve(model.countDocuments(query));
  });
}

function findDocumentsPaginated(model, query, pager) {
  return new Promise(resolve => {
    resolve(
      model
        .find(query)
        .skip(pager.pageSize * (pager.currentPage - 1))
        .limit(pager.pageSize)
    );
  });
}

function findPhotos(query, pager, sort) {
  return new Promise((resolve, reject) => {
    Photo.find(query)
      .populate({ path: "like", select: "count" })
      .populate("user")
      .skip(pager.pageSize * (pager.currentPage - 1))
      .limit(pager.pageSize)
      .sort(sort)
      .exec(function(err, photos) {
        if (err) return reject(err);
        if (photos) return resolve(photos);
      });
  });
}

function sortingQuery(sorting) {
  if (sorting === "oldest") {
    return { date: 1 };
  }
  if (sorting === "likes") {
    return { likesCount: -1 };
  } else return { date: -1 };
}

module.exports = router;
