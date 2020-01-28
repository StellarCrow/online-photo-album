const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("../config/keys").storagePath;
const paginate = require("jw-paginate");
const Vibrant = require("node-vibrant");
const { promisify } = require("util");
const sizeOf = promisify(require("image-size"));
const sharp = require("sharp");

const User = require("../models/User");
const Album = require("../models/Album");
const Photo = require("../models/Photo");
const Like = require("../models/Like");

//Multer Storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

/* 
    Upload one image, creates new Photo and Like instances in DB,
    updates related User, Album
    @returns {JSON Object} Object contains status and message
*/
router.post(
  "/uploadImage",
  upload.single("imageFile"),
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      let albumId;
      let user = req.body.userId;
      let tags = req.body.tags === "" ? [] : req.body.tags.split(",");
      let colors = await setImageColors(req.file.path);
      let size = await getImageSize(req.file.path);
      let cropWidth = size.width > 1000 ? 1000 : null;
      resizeImage(req.file.path, req.file.filename, cropWidth);
      let orientation = getImageOrientation(size.width, size.height);

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
        colors: colors,
        orientation: orientation
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
    } catch (err) {
      return res.status(500).json({
        success: true,
        msg: "Oops! Something went wrong :( \n Please, try again."
      });
    }
  }
);

/* 
    Compresses uploaded image. Resizes and set quality.
    @param {String} imagePath - path to the image
    @param {String} imageName - name of the image
    @param {Number} cropWidth - number of pixels for output image's width
*/
function resizeImage(imagePath, imageName, cropWidth) {
  let outputPath = path + "\\compressed\\" + imageName;
  sharp(imagePath)
    .resize(cropWidth, null)
    .jpeg({ quality: 80 })
    .toFile(outputPath);
}

/* 
    Returns image orientation type
    @param {String} width - image's width
    @param {String} height - image's height
    @returns {String} image orientation
*/
function getImageOrientation(width, height) {
  if (width === height) {
    return "square";
  }
  return width > height ? "landscape" : "portrait";
}

/* 
    Calculates image dimensions. Returns orientation type
    @param {String} imagePath - path to the image
    @returns {Promise} Promise object represents object orientation (string)
*/
async function getImageSize(imagePath) {
  try {
    const dimensions = await sizeOf(imagePath);
    return { width: dimensions.width, height: dimensions.height };
  } catch (err) {
    console.log(err);
  }
}

/* 
    Extracts main colors (hex value) from image with Vibrant.
    @param {String} imagePath - path to the image
    @returns {Promise} Promise object represents array of colors (hex value)
*/
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

/* 
    Extracts main colors from image with Vibrant. 
    @param {String} imagePath - path to the image
    @returns {Promise} Promise object represents array of colors (names)
*/
function setImageColors(imagePath) {
  let colors = [];
  let colours = getColorsObjectList();
  let imageColorsText = [];
  let diff;
  return new Promise(resolve => {
    Vibrant.from(imagePath).getPalette(function(err, palette) {
      for (let swatch in palette) {
        colors.push(palette[swatch].getHex());
      }
      for (let i in colors) {
        for (let j in colours) {
          diff = Vibrant.Util.hexDiff(colors[i], colours[j]);
          if (diff <= 10) {
            imageColorsText.push(j);
          }
        }
      }
      resolve(imageColorsText);
    });
  });
}

/* 
    Finds all Photos that matches query, filter, sort, and pagination
    Finds all Users by query
    @param {string} query - searches users by username, photos by tags
    @param {string} sort - type of sorting
    @param {string} filter - type of filter
    @param {number} page - page for pagination
    @returns {JSON Object} Object contains array of users, array of photos, 2 objects for pagination
*/
router.get("/search/(:query)?", async function(req, res) {
  let query = req.params.query || "";
  let sorting = req.query.sort;
  let orientation = req.query.orientation || "";
  let filter = req.query.filter.toLowerCase();
  let page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  let sort = sortingQuery(sorting);
  let photosQuery;
  if (query === "") {
    photosQuery = {
      colors: { $exists: true, $regex: filter },
      orientation: { $regex: orientation }
    };
  } else {
    photosQuery = {
      tags: { $exists: true, $regex: query },
      colors: { $exists: true, $regex: filter },
      orientation: { $regex: orientation }
    };
  }

  //get all documents count
  let usersCount = await getDocumentsCount(User, {
    username: { $exists: true, $regex: query }
  });
  let photosCount = await getDocumentsCount(Photo, photosQuery);

  //pagination
  let pagerUsers = paginate(usersCount, page, pageSize, 5);
  let pagerPhotos = paginate(photosCount, page, pageSize, 5);

  //find users & paginate
  let users = await findDocumentsPaginated(
    User,
    {
      username: { $exists: true, $regex: query }
    },
    pagerUsers
  );

  //find sorted, filtered & paginated photos
  let photos = await findPhotosWithAllOptions(photosQuery, pagerPhotos, sort);

  return res.status(200).json({
    success: true,
    msg: "searched results",
    photos: photos,
    users: users,
    pagerPhotos: pagerPhotos,
    pagerUsers: pagerUsers
  });
});

/* 
    Counts all model's documents in db
    @param {string} model - MongoDB model
    @param {string} query - query for selecting documents
    @returns {Promise} Promise object represents number of documents 
*/
function getDocumentsCount(model, query) {
  return new Promise(resolve => {
    resolve(model.countDocuments(query));
  });
}

/* 
    Find documents in db considering limits by amount
    @param {string} model - MongoDB model
    @param {string} query - query for selecting documents
    @param {object} pager - Object that contains info about pagination
    @returns {Promise} Promise object represents an array of selected documents 
*/
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
/* 
    Find documents in db selected by query, count limit, sort and filter
    @param {string} query - query for selecting documents
    @param {object} pager - Object that contains info about pagination
    @param {string} sort - sort type
    @returns {Promise} Promise object represents an array of selected documents 
*/
function findPhotosWithAllOptions(query, pager, sort) {
  let skip =
    pager.currentPage === 0 ? 0 : pager.pageSize * (pager.currentPage - 1);
  return new Promise((resolve, reject) => {
    Photo.find(query)
      .populate({ path: "like", select: "count" })
      .populate("user")
      .skip(skip)
      .limit(pager.pageSize)
      .sort(sort)
      .exec(function(err, photos) {
        if (err) return reject(err);
        if (photos) {
          return resolve(photos);
        }
      });
  });
}

/* 
    Creates sorting query by sorting name
    @param {string} sorting - sort type
    @returns {object} object represents query for mongoose
*/
function sortingQuery(sorting) {
  if (sorting === "oldest") {
    return { date: 1 };
  }
  if (sorting === "likes") {
    return { likesCount: -1 };
  } else return { date: -1 };
}

/* 
    Colors list name-hex
    @param {string} colour - color name
    @returns {object} colors
*/
function getColorsObjectList() {
  return {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    "indianred ": "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
}

module.exports = router;
