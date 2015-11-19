let express = require('express');
let
let router  = express.Router();



// artists route
// http://localhost:3000/artists
router.route('/artist')
.get((req, res, next) => {
  Artist.find({}, (err, artists) => {
    res.json(artists);
  })
})
// create an artist
.post((req, res, next) => {
  let newArtist = new Artist({
    // name: req.body.name,
    // img_url: req.body.img_url,
    // nationality: req.body.nationality,
    // birthYear: req.body.birthYear,
    // description: req.body.description

    name: 'Steve Chen',
    img_url: 'handsomeSteve.png',
    nationality: 'US',
    birthYear: new Date(1980, 1, 1),
    description: 'best artist'
  });

  newArtist.save((err) => {
    if(err) throw err;

    console.log('Artist was successfully created.');
    res.json({ success: true });
  });
})
// view all the info for an artist
router.route('/artists/:id')
.get((req, res) => {
  Artist.findOne({ id: req.params.id }, (err, artist) => {
    res.json(artist)
  });
});
