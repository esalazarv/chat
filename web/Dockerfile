FROM node:lts-alpine
WORKDIR /var/www/web
RUN npm install -g @angular/cli

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4200

#CMD [ "node", "server.js" ]
CMD [ "ng", "serve", "--host", "0.0.0.0"]
