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
  let filter = colourNameToHex(req.query.filter);
  let page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  let sort = sortingQuery(sorting);

  //get all documents count
  // let albumsCount = await getDocumentsCount(Album, {
  //   name: { $exists: true, $regex: query }
  // });
  let usersCount = await getDocumentsCount(User, {
    username: { $exists: true, $regex: query }
  });
  let photosCount = await getDocumentsCount(Photo, {
    tags: { $exists: true, $regex: query }
  });

  //pagination
  // let pagerAlbums = paginate(albumsCount, page, pageSize);
  let pagerUsers = paginate(usersCount, page, pageSize);
  let pagerPhotos = paginate(photosCount, page, pageSize);

  //find users & paginate
  let users = await findDocumentsPaginated(
    User,
    {
      username: { $exists: true, $regex: query }
    },
    pagerUsers
  );
  //find users & paginate
  // let albums = await findDocumentsPaginated(
  //   Album,
  //   {
  //     name: { $ne: "Default", $exists: true, $regex: query }
  //   },
  //   pagerAlbums
  // );

  //find sorted, filtered & paginated photos
  let photos = await findPhotosWithAllOptions(
    { tags: { $exists: true, $regex: query } },
    pagerPhotos,
    sort,
    filter
  );

  return res.status(200).json({
    success: true,
    msg: "searched results",
    photos: photos,
    // albums: albums,
    users: users,
    // pagerAlbums: pagerAlbums,
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

function findPhotosWithAllOptions(query, pager, sort, colorFilter) {
  let diff;
  let diffResult;
  let skip =
      pager.currentPage === 0 ? 0 : pager.pageSize * (pager.currentPage - 1);
  return new Promise((resolve, reject) => {
    Photo.find(query, function(err, photos) {
      if (err) return reject(err);
      if (photos) {
        if (!colorFilter) return resolve(photos);
        let filteredPhotos = [];
        photos.forEach(photo => {
          for(let i in photo.colors) {
            diff = Vibrant.Util.hexDiff(photo.colors[i], colorFilter);
            diffResult = Vibrant.Util.getColorDiffStatus(diff);
            console.log(photo.colors[i], colorFilter, diff, diffResult);
            if (diff <= 15) {
              filteredPhotos.push(photo);
              break;
            }
          }
        });
        resolve(filteredPhotos);
      }
    })
      .populate({ path: "like", select: "count" })
      .populate("user")
      .skip(skip)
      .limit(pager.pageSize)
      .sort(sort)
      .exec(function(err, photos) {
        console.log(photos);
        
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


function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return "";
}

module.exports = router;
