const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("../config/keys").storagePath;
const paginate = require("jw-paginate");
const Vibrant = require("node-vibrant");

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
    let colors = await getImageColors(req.file.path);

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
      album: albumId,
      colors: colors
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

function getImageColors(imagePath) {
  let colors = [];
  return new Promise(resolve => {
    Vibrant.from(imagePath).getPalette(function(err, palette) {
      for (let swatch in palette) {
        colors.push(palette[swatch].getHex());
      }
      return resolve(colors);
    });
  });
}

//Search all photos, albums, users by query
router.get("/search/(:query)?", async function(req, res) {
  let query = req.params.query || "";
  let sorting = req.query.sort;
  let filter = req.query.filter || "";
  let page = parseInt(req.query.page) || 1;

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
      name: { $ne: "Default", $exists: true, $regex: query }
    },
    pagerAlbums
  );
  let photos = await findPhotos(
    { tags: { $exists: true, $regex: query } },
    pagerPhotos,
    sort
  );

  let filteredPhotos = await filterPhotos(
    { tags: { $exists: true, $regex: query } },
    filter
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
    let skip =
      pager.currentPage === 0 ? 0 : pager.pageSize * (pager.currentPage - 1);
    resolve(
      model
        .find(query)
        .skip(skip)
        .limit(pager.pageSize)
    );
  });
}

function findPhotos(query, pager, sort) {
  return new Promise((resolve, reject) => {
    let skip =
      pager.currentPage === 0 ? 0 : pager.pageSize * (pager.currentPage - 1);
    Photo.find(query)
      .populate({ path: "like", select: "count" })
      .populate("user")
      .skip(skip)
      .limit(pager.pageSize)
      .sort(sort)
      .exec(function(err, photos) {
        if (err) return reject(err);
        if (photos) return resolve(photos);
      });
  });
}

function filterPhotos(query, colorFilter) {
  let diff;
  let diffResult;
  return new Promise((resolve, reject) => {
    Photo.find(query, function(err, photos) {
      if (err) return reject(err);
      if (photos) {
        if(!colorFilter) return resolve(photos);
        let filteredPhotos = [];
        photos.forEach(photo => {
            diff = Vibrant.Util.hexDiff(photo.colors[0], colorFilter);
            diffResult = Vibrant.Util.getColorDiffStatus(diff);
            if(diffResult !== "Wrong") {
              filteredPhotos.push(photo);
            }
        });
        resolve(filteredPhotos);
      }
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
