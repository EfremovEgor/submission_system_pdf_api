#!/bin/bash

set -e

git pull origin master
docker build -t pdf_api:latest .