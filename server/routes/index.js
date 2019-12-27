const express = require("express");
const router = express.Router();

router.post('/registration', function(req, res) {
    console.log(req.body.fullName);
    res.send({message: `Registation func ${req.body.fullName}`})
})


module.exports = router;