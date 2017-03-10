const Worker = require('firefly-core-libs').Worker;
const HumidityComponent = require('./components/HumidityComponent');

class HumiditySensor extends Worker {
  constructor({id, minHumidity, maxHumidity, delay}) {
    super({id, delay, data:null});
    this.humidity = new HumidityComponent({minHumidity, maxHumidity})
  }
  generateData(data) {
    let now = new Date();
    let t = now.getMinutes() + now.getSeconds() / 100;
    this.humidity.value = this.humidity.getLevel(t);
    //console.log(this.humidity.value)
  }
  getData() {
    return {
      id: this.id,
      value: this.humidity.value,
      unit: this.humidity.unit,
      delay: this.delay,
      min: this.humidity.min,
      max: this.humidity.max,
      kind: "humidity"
    }
  }
}

module.exports = HumiditySensor
