'use strict'

let express = (require 'express');
let app = express();
let logger = require('morgan');
let bodyParser = require('body-parser');






let server = app.listen(3000, () => {
  let host = server.address().address;
  let port= server.address().port;

  console.log('express running', host, port);
});
