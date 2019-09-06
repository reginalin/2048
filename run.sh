#!/bin/bash

# compile react
cd frontend
npm run build

# run app using flask
cd ../backend
python backend.py
