const projectData = {};

var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).sendFile('dist/index.html');
  //res.sendFile(path.resolve('src/client/views/index.html'));
});

app.post('/trip', (req, res) => {
  projectData['to'] = req.body.toCity;
  projectData['date'] = req.body.startDate;
  projectData['remainDays'] = req.body.remainingDays;
  projectData['stayDays'] = req.body.stayingDays;
  projectData['country'] = req.body.country;
  projectData['temperature'] = req.body.temperature;
  projectData['img'] = req.body.img;
  res.send(projectData);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});

module.exports = app;
