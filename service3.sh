#!/bin/bash
export SERVICE_CREDENTIALS=firefly
export PORT=9093
export EXPOSED_PORT=9093
export SERVER_URL=http://localhost:8080
export SERVICE_BASE_URL=http://localhost # without port
export SERVICE_NAME=sensors_quarter_c
export SERVICE_ID=43
export SERVICE_VERSION=1.0
export SERVICE_DESCRIPTION=🦁
export NB_TEMPERATURE_SENSORS=2
export NB_HUMIDITY_SENSORS=2

node index.js