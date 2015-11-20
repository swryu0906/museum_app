'use strict';

let mongoose = require('mongoose');

let paintingSchema = new mongoose.Schema({
  title: String,
  img_url: String,
  year_made: Date,

  created_at: Date,
  updated_at: Date
})

var Painting = mongoose.model('Painting', paintingSchema);

module.exports = Painting;
