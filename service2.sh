#!/bin/bash
export SERVICE_CREDENTIALS=firefly
export PORT=9092
export EXPOSED_PORT=9092
export SERVER_URL=http://localhost:8080
export SERVICE_BASE_URL=http://localhost # without port
export SERVICE_NAME=sensors_quarter_b
export SERVICE_ID=42
export SERVICE_VERSION=1.0
export SERVICE_DESCRIPTION=🐡
export NB_TEMPERATURE_SENSORS=3
export NB_HUMIDITY_SENSORS=2

node index.js