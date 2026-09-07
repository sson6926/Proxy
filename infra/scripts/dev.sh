#!/bin/bash
cd "$(dirname "$0")/../compose"
docker-compose -f compose.yml up --build
