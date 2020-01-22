const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require("mongoose");
const MONGO_URI = require("../config/keys").mongoURI;

const app = express();

let usersRouter = require('../routes/users');
let indexRouter = require('../routes/index');
let photosRouter = require('../routes/photos');
let albumsRouter = require('../routes/albums');

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
console.log(mongoose.connection.readyState);


// app.use('/uploads', express.static('uploads'));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
//Passport Strategy
require('../config/passport')(passport);


app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/photos/', photosRouter);
app.use('/albums/', albumsRouter);

app.listen(process.env.PORT || 8081);