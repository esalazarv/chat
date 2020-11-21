FROM node:lts-alpine as base

# Create app directory
WORKDIR /var/www/api

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4200
#CMD [ "node", "server.js" ]
CMD [ "npm", "run", "start" ]