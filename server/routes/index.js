const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})
const upload = multer({storage: storage});

router.post('/uploadImage', upload.single('imageFile'), passport.authenticate('jwt', {session: false}), function(req, res, next){
    //req.file.path
})


module.exports = router;