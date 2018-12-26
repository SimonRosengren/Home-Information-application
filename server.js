const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

require('./server/app/routes')(app, {});

app.use(express.static(path.join(__dirname, '/client')));


app.listen((process.env.PORT || 5000), () => {
  console.log('We are live on ' + port);
});