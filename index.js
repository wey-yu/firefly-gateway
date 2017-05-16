// Demo

console.log("HELLO")

const HeartBeat = require('firefly-service').HeartBeat
const httpService = require('firefly-service').httpService

const TemperatureSensor = require('./sensors/TemperatureSensor');
const HumiditySensor = require('./sensors/HumiditySensor');


// TODO: config file
const httpPort =  process.env.PORT || 5000 // 8080 on CC
const exposedHttpPort = process.env.EXPOSED_PORT || 5000 // 80 on CC
const credentials = process.env.SERVICE_CREDENTIALS || 'firefly'

const serverUrl = process.env.SERVER_URL || `http://localhost:8080` 

//const serviceBaseUrl = `${process.env.SERVICE_BASE_URL || 'http://localhost'}:${exposedHttpPort}`
const serviceBaseUrl = process.env.SERVICE_BASE_URL || "http://" + process.env.APP_ID.replace("_", "-") + ".cleverapps.io"

const serviceName = process.env.SERVICE_NAME || "sensors"

//const serviceId = process.env.SERVICE_ID || "001"
//const serviceId = process.env.SERVICE_ID || require('uuid/v1')()
const serviceId = process.env.SERVICE_ID || process.env.APP_ID


const serviceVersion = process.env.SERVICE_VERSION || "1.0.0"
const description = process.env.SERVICE_DESCRIPTION || "Hello 🌍"

let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


const nbTemperatureSensors = process.env.NB_TEMPERATURE_SENSORS || getRandomInt(1,5)
const nbHumiditySensors = process.env.NB_HUMIDITY_SENSORS || getRandomInt(1,5)


// ============ SENSORS ============
let randomDelay =  () => {
  //let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  return getRandomInt(1500, 4000);
}
// Generate n temperature sensors
let temperatureSensors = [...Array(parseInt(nbTemperatureSensors)).keys()].map(item => {
  let t = new TemperatureSensor({id:`t${item}`, minTemperature:-10, maxTemperature:10, delay:randomDelay()});
  t.start({task:"generateData"});
  return  t;
});

// Generate n humidity sensors
let humiditySensors = [...Array(parseInt(nbHumiditySensors)).keys()].map(item => {
  let h = new HumiditySensor({id:`h${item}`, delay:randomDelay()});
  h.start({task:"generateData"});
  return  h;
});
// =================================


let serviceInformations = {
  name: serviceName, 
  id: serviceId,
  version: serviceVersion,
  url: serviceBaseUrl+"/"+serviceName,
  description: description,
  operations: [
    {
      name: "temperatureValues",
      url: serviceBaseUrl+"/"+serviceName+"/temperature/values",
      method: "GET",
      result: "",
      description: ""
    },
    {
      name: "humidityValues",
      url: serviceBaseUrl+"/"+serviceName+"/humidity/values",
      method: "GET",
      result: "",
      description: ""
    }
  ]
}

console.log("🌍 serviceInformations: ", serviceInformations)

// talk with the discovery server
let heartBeat = new HeartBeat({
  id: 'serviceHeartBeat',
  delay: 4000,
  data: {serverUrl, serviceInformations, credentials}
})

heartBeat.on('error', (error) => {
  console.log("🐻 Something is Wrong")
})

heartBeat.start({task:"hey"})

httpService({serviceName}).then(service => {

  // http://localhost:9090/sensors/temperatures
  service.get(`/${serviceName}/temperature/values`, (req, res) => {
    res.send(temperatureSensors.map(sensor => sensor.getData()))
  });

  service.get(`/${serviceName}/humidity/values`, (req, res) => {
    res.send(humiditySensors.map(sensor => sensor.getData()))
  });
  
  service.get(`/`, (req, res) => {
    res.send(`<h1>${serviceName}</h1>`)
  });

  service.listen(httpPort);
  console.log(`🌍 Microservice is started - listening on ${httpPort}`);

})



