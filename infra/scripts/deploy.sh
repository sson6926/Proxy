#!/bin/bash
cd "$(dirname "$0")/../compose"
docker-compose -f compose.prod.yml up -d --build
