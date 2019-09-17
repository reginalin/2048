# Build ARGs: 
# NODE_VERSION: specifies the Node/system version

ARG NODE_VERSION

#######################################################################
FROM node:${NODE_VERSION} as base

# Create app directory
WORKDIR /usr/src/app

# Copy project setup files 
COPY package*.json /app/
#COPY yarn.lock /app

#RUN npm install

# Copy project files
COPY . . 

#######################################################################
FROM base as test

# Install the project locally for testing purposes
RUN npm install

## Run tests
#ENTRYPOINT ./test.sh
ENTRYPOINT npm start 

#######################################################################
FROM base as development 

# Install the project locally for testing purposes
RUN npm install

ENTRYPOINT npm start 

#######################################################################
FROM base as release

# Build the release
RUN npm ci --only=production 

ENTRYPOINT npm start 
