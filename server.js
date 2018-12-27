const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const MongoClient    = require('mongodb').MongoClient;
var db = require('./config/db');



app.use(express.static(path.join(__dirname, '/client')));

MongoClient.connect(db.url, (err, database) => {
  if (err) console.log(err)
  db = database.db(); 
  require('./server/app/routes')(app, db);
  app.listen((process.env.PORT || port), () => {
    console.log('We are live on ' + port);
  });
})

