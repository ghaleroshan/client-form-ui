# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:10

# Create and change to the app directory.
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.

# Install production dependencies.
COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app


CMD ["npm","start"]

