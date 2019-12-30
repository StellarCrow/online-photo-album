const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/testDB", { useNewUrlParser: true });
console.log(mongoose.connection.readyState);

let User = require('../models/User');


router.post('/registration', function(req, res) {
    console.log(req.body.fullName);
    User.create({
        name: req.body.fullName,
        password: req.body.password,
        username: req.body.username
    }).catch(err => {
        res.send("Error: " + err);
    });

    res.send({message: `Registation func ${req.body.fullName}`})
})


module.exports = router;