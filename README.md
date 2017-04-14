# firefly-gateway

## Deployment on CC

```
PORT=8080
EXPOSED_PORT=80
SERVICE_CREDENTIALS=firefly
SERVER_URL=http://firefly.cleverapps.io
SERVICE_BASE_URL=http://firefly-gateway-001.cleverapps.io
SERVICE_NAME=sensors_quarter_a
SERVICE_ID=10
SERVICE_VERSION=1.0
SERVICE_DESCRIPTION=🐝
NB_TEMPERATURE_SENSORS=3
NB_HUMIDITY_SENSORS=3
```

## Simplest version

```
EXPOSED_PORT=80
PORT=8080
SERVER_URL=http://firefly.cleverapps.io
SERVICE_CREDENTIALS=firefly
SERVICE_DESCRIPTION=🎃
SERVICE_NAME=sensors_quarter_a
SERVICE_VERSION=1.0
```

If change the code of a gateway, you can generate a fix deployment for all the gateways

Or even simpler: 

```
PORT=8080
SERVER_URL=http://firefly.cleverapps.io
SERVICE_CREDENTIALS=firefly
SERVICE_DESCRIPTION=🎃
SERVICE_NAME=sensors_home
```

If you read the logs, you can get the url of the senesors:

```
❤️ {"name":"sensors_home","id":"a4b2adc0-20cc-11e7-9d16-c1a1232b8555","version":"1.0.0","url":"http://app-222b79cb-4f14-49ef-a1ac-6dedf11cbffb.cleverapps.io/sensors_home","description":"🎃","operations":[{"name":"temperatureValues","url":"http://app-222b79cb-4f14-49ef-a1ac-6dedf11cbffb.cleverapps.io/sensors_home/temperature/values","method":"GET","result":"","description":""},{"name":"humidityValues","url":"http://app-222b79cb-4f14-49ef-a1ac-6dedf11cbffb.cleverapps.io/sensors_home/humidity/values","method":"GET","result":"","description":""}]}
```

⚠️ if you want that the gateway appears in the list of `firefly-monitor` the name of the service must start with `sensors`