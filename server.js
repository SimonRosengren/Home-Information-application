const express = require('express');
const app = express();
const port = 8000;

require('./server/app/routes')(app, {});

app.listen((process.env.PORT || 5000), () => {
  console.log('We are live on ' + port);
  file.serve()
});