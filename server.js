'use strict';

// =================================================================
// dependency packages =============================================
// =================================================================

let express     = (require 'express');
let app         = express();
let logger      = require('morgan');
let bodyParser  = require('body-parser');
// let mongoose    = require('mongoose');
//
// let jwt         = require('jsonwebtoken');
// let config      = require('config');
// let Artist      = require('./models/artist');
// let Painting    = require('./models/painting');



// =================================================================
// configuration ===================================================
// =================================================================

// // connect to database
// mongoose.connect(config.database);

// body parser for getting data from POST or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan to log requests to the console
app.use(morgan('dev'));



// =================================================================
// server ==========================================================
// =================================================================

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port= server.address().port;

  console.log('express running', host, port);
});



// =================================================================
// root routes =====================================================
// =================================================================

// basic route (http://localhost:3000)
app.get('/', (req, res) => {
	res.send('Hello! This is Museum App');
});

// create an instance of the router
let route = express.Router();



// =================================================================
// other routes ====================================================
// =================================================================

// artists route
// http://localhost:3000/artists
route.get('/artists', (req, res, next) => {
  Artist.find({}, (err, artists) => {
    res.json(artists);
  })
})
// create an artist
.post('/artists', (req, res, next) => {
  let newArtist = new Artist({
    name: req.body.name,
    img_url: req.body.img_url,
    nationality: req.body.nationality,
    birthYear: req.body.birthYear,
    description: req.body.description
  });

  newArtist.save((err) => {
    if(err) throw err;

    console.log('Artist was successfully created.');
    res.json({ success: true });
  });
})
// view all the info for an artist
.get('/artists/:id', (req, res) => {
  Artist.findOne({ id: req.params.id }, (err, artist) => {
    res.json(artist)
  });
});


// paitings route
// http://localhost:3000/paintings
route.get('/paintings' (req, res, next) => {
  Painting.find({}, (err, paintings) => {
    res.json(paintings);
  })
})
// create an painting
.post('/paintings' (req, res, next) => {
  let newPainting = new Painting({
    title: req.body.title,
    img_url: req.body.img_url,
    year_made: req.body.year_made
  });

  newPainting.save((err) => {
    if(err) throw err;

    console.log('Painting was successfully created.');
    res.json({ success: true });
  });
})
// view all info for an painting
route.get('/paintings/:id', (req, res) => {
  Painting.findOne({ id: req.params.id }, (err, painting) => {
    res.json(painting);
  })
});
