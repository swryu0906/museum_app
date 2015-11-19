'use strict';

// =================================================================
// dependency packages =============================================
// =================================================================

let express     = require('express');
let app         = express();
let logger      = require('morgan');
let bodyParser  = require('body-parser');
let mongoose    = require('mongoose');
let path        = require('path');
//
// let expressJWT  = require('express-jwt');
// let jwt         = require('jsonwebtoken');
let config      = require('./config');
let Artist      = require('./models/artist');
let Painting    = require('./models/painting');



// =================================================================
// configuration ===================================================
// =================================================================

// connect to database
mongoose.connect(config.database);

// body parser for getting data from POST or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan to log requests to the console
app.use(logger('dev'));






// =================================================================
// root routes =====================================================
// =================================================================

// basic route (http://localhost:3000)

// create an instance of the router
let router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello! This is Museum App');
});
app.use('/', router);

// =================================================================
// other routes ====================================================
// =================================================================

// artists route
// http://localhost:3000/artists
router.get('/artists', (req, res) => {
  Artist.find({}, (err, artists) => {
    res.json(artists);
  })
});

// create an artist
router.post('/artists', (req, res) => {
  // console.log('req = \n' + req);
  console.log('req.body = \n' + req.body);
  let newArtist = new Artist({
    name: req.body.name,
    img_url: req.body.img_url,
    nationality: req.body.nationality,
    birthYear: new Date(req.body.birthYear),
    description: req.body.description

    // name: 'Steve Chen',
    // img_url: 'handsomeSteve.png',
    // nationality: 'US',
    // birthYear: new Date(1980, 1, 1),
    // description: 'best artist'
  });

  newArtist.save((err) => {
    if(err) throw err;

    console.log('Artist was successfully created.');
    console.log(res);
    res.status(200).json({ success: true });
  });
});

// show the info for an artist
router.get('/artists/:id', (req, res) => {
  Artist.findOne({ _id: req.params.id }, (err, artist) => {
		if(err) throw err;

    res.json(artist);
  });
});

// update the info for an artist
router.put('/artists/:id', (req, res) => {
	// Artist.findOneUpdate({ _id: req.params.id }, (err, artist) => {
	// 	if(err) throw err;
	//
	// 	console.log('Artists was successfully updated.');
	// 	res.json(artist);
	// });

	Artist.findById(req.params.id, (err, artist) => {
		if(err) throw err;

		if(req.body.name) artist.name = req.body.name;
		if(req.body.img_url) artist.img_url = req.body.img_url;
		if(req.body.nationality) artist.nationality = req.body.nationality;
		if(req.body.birthYear) artist.birthYear = new Date(req.body.birthYear);
		if(req.body.description) artist.description = req.body.description;

		artist.save((err) => {
			if(err) throw err;

			console.log('Artist was successfully updated.');
			res.json({
				success: true,
				message: 'Artist was successfully updated.'
			});
		});
	});
});

// delete an artist
router.delete('/artists/:id', (req, res) => {
	Artist.remove({ _id: req.params.id}, (err, artist) => {
		if(err) throw err;

		res.json({
			success: true,
			message: 'Artist was successfully deleted.'
		});
	});
});


// paitings route
// http://localhost:3000/paintings
router.get('/paintings', (req, res) => {
  Painting.find({}, (err, paintings) => {
    res.json(paintings);
  })
});

// create an painting
router.post('/paintings', (req, res) => {
  let newPainting = new Painting({
    title: req.body.title,
    img_url: req.body.img_url,
    year_made: new Date(req.body.year_made)

    // title: 'handsome Steve',
    // img_url: 'handsome Guy\'s Portrait',
    // year_made: new Date(2015, 9, 8)
  });

  newPainting.save((err) => {
    if(err) throw err;

    console.log('Painting was successfully created.');
    res.status(200).json({ success: true });
  });
});

// show the info for an painting
router.get('/paintings/:id', (req, res) => {
  Painting.findOne({ _id: req.params.id }, (err, painting) => {
		if(err) throw err;
    res.json(painting);
  })
});

// update the info for an painting
router.put('/paintings/:id', (req, res) => {
	// Painting.findOneAndUpdate({ _id: req.params.id }, (err, painting) => {
	// 	if(err) throw err;
	//
	// 	console.log('Painting was successfully updated.');
	// 	res.json(painting);
	// });

	Painting.findById(req.params.id, (err, painting) => {
		if(err) throw err;

		if(req.body.title) painting.title = req.body.title;
		if(req.body.img_url) painting.img_url = req.body.img_url;
		if(req.body.year_made) painting.year_made = new Date(req.body.year_made);

		painting.save((err) => {
			if(err) throw err;
			res.json({
				success: true,
				message: 'Painting was successfully updated.'
			});
		});
	});
})

router.delete('/paintings/:id', (req, res) => {
	Painting.remove({
		_id: req.params.id
	},
	(err, painting) => {
		if(err) throw err;
		res.json({
			success: true,
			message: 'Painting was successfully deleted.'
		});
	});
});

// =================================================================
// server ==========================================================
// =================================================================




let server = app.listen(3000, () => {
  let host = server.address().address;
  let port= server.address().port;

  console.log('express running', host, port);
});
