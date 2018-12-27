
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
        temperature = message.toString();
      if (topic == "humidity")
        humidity = message.toString();
    });
  });
}

init();

module.exports = function (app, db) {
  app.get('/temperature', (req, res) => {
    console.log(temperature)
    res.send(temperature);
  });
  app.get('/humidity', (req, res) => {
    res.send(humidity);
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/index.html'))
  })
  setInterval(() => { //This should be moved?
    if (temperature != "notset") {
      var temperatureData = { type: 'temperature', value: temperature, time: Date.now() }
      db.collection('temperature').insert(temperatureData)
    }
    if (humidity != "notset") {
      var humidityData = { type: 'humidity', value: humidity, time: Date.now() }
      db.collection('humidity').insertOne(humidityData)
    }
  }, 1000 * 60 * 10); //Every 10 min
};


