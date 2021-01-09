const dotenv = require('dotenv');
dotenv.config();
//var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: fetch } = require('node-fetch');

var application_key = process.env.API_KEY;

const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
  //res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});
