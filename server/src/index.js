// require dotenv to use environment variables
require('dotenv').config();

// require express and other middleware
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors =require("cors")

// require custom routes
const route = require('./routes/route.js');

// require mongoose to interact with MongoDB
const { default: mongoose } = require('mongoose');
mongoose.set('strictQuery', false);

// create an instance of express app
const app = express();

// use middleware
app.use(bodyParser.json());
app.use(multer().any());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// connect to MongoDB using the URL from .env file
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDb is connected'))
  .catch((err) => console.log(err));

// define a route to test if the backend is connected or not
app.get('/', (req, res) => {
  res.status(201).json({ message: 'Connected to Backend!' });
});

// use custom routes
app.use('/', route);

// start the server and listen to incoming requests
app.listen(process.env.PORT || 3000, function () {
  console.log('Express app running on port ' + (process.env.PORT || 3000));
});
