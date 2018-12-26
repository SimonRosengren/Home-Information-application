
var mqtt = require('mqtt');
var path = require('path');
var temperature = "notset";
var humidity = "notset";
var options = {
  port: 19116,
  host: 'mqtt://m21.cloudmqtt.com',
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'fdwpomyh',
  password: 'a3LO4lnMiRAi',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
};


function init() {
  var client = mqtt.connect('mqtt://m21.cloudmqtt.com', options);
  client.on('connect', function () { // When connected
    console.log('connected');
    client.subscribe('temperature');
    client.subscribe('humidity');
    client.on('message', function (topic, message, packet) {
      if (topic == "temperature")
        temperature = message;
      if (topic == "humidity")
        humidity = message;
    });
  });
}

init();

module.exports = function (app, db) {
  app.get('/temperature', (req, res) => {
    res.send(temperature);
  });
  app.get('/humidity', (req, res) => {
    res.send(humidity);
  });
  app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname+'../../client/index.html'))
  })
};


