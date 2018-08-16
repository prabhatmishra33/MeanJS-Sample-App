// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongo = require("mongoose");
var ObjectId = require('mongodb').ObjectID;

// Get our API routes
const api = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/',function(req,res,next){
  console.log()
  console.log(req.method," : ",req.url);
  next()
})

// Set our api routes
app.use('/', api);



//Catch all other routes and return the index file
app.get('*', (req, res) => {
  console.log()
  console.log(req.url)
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// app.all('*',(req, res) => {
//   console.log(req.url);
//   console.log()
// })

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));


module.exports = app;


