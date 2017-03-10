const Worker = require('firefly-core-libs').Worker;
const TemperatureComponent = require('./components/TemperatureComponent');

class TemperatureSensor extends Worker {
  constructor({id, minTemperature, maxTemperature, delay}) {
    super({id, delay, data: null});
    this.temperature = new TemperatureComponent({minTemperature, maxTemperature})
  }
  generateData() {
    let now = new Date();
    let t = now.getMinutes() + now.getSeconds() / 100;
    this.temperature.value = this.temperature.getLevel(t);
    //console.log(this.temperature.value)
  }
  getData() {
    return {
      id: this.id,
      value: this.temperature.value,
      unit: this.temperature.unit,
      delay: this.delay,
      min: this.temperature.min,
      max: this.temperature.max,
      kind: "temperature"
    }
  }
}

module.exports = TemperatureSensor
