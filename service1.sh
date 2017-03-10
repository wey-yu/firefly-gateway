#!/bin/bash
export SERVICE_CREDENTIALS=firefly
export PORT=9091
export EXPOSED_PORT=9091
export SERVER_URL=http://localhost:8080
export SERVICE_BASE_URL=http://localhost # without port
export SERVICE_NAME=sensors_quarter_a
export SERVICE_ID=41
export SERVICE_VERSION=1.0
export SERVICE_DESCRIPTION=🐝
export NB_TEMPERATURE_SENSORS=3
export NB_HUMIDITY_SENSORS=3

node index.js