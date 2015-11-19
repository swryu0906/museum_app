'use strict';

let mongoose = require('mongoose');

let artistSchema = new mongoose.Schema({
  name: String,
  img_url: String,
  nationality: String,
  birthYear: Date,
  description: String,

  created_at: Date,
  updated_at: Date
});

var Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
