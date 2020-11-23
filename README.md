# Chat application

# Requirements
- Docker v19.03.13 or higher
- Docker compose 1.27.4 o higher

# Intsallation

Clone the code
```bash
git clone https://github.com/esalazarv/chat.git
```

Copy the docker `.env.example` file
```bash
cp .env.example .env
``` 

Change the environment vars or prefer keep the default values if you prefer 
```dotenv
# API and PWA container variables
DOCKER_API_PORT=3000
DOCKER_PWA_PORT=4200
DOCKER_MONGO_PORT=27017 # only for development

# Database credentials for build cointainer
DOCKER_MONGO_INITDB_ROOT_USERNAME=root
DOCKER_MONGO_INITDB_ROOT_PASSWORD=secret
DOCKER_MONGO_INITDB_DATABASE=chat
DOCKER_MONGO_INITDB_USERNAME=admin
DOCKER_MONGO_INITDB_PASSWORD=secret
DOCKER_MONGO_INITDB_ROLE=readWrite
```

Build an up the docker container
```
docker-compose up --build -d
```

This will build a mongo db and up the express API listening on 3OOO port
and the angular app listening on 4200 port

Host for the express API and sockets:
http://localhost:3000

Host for SPA chat:
http://localhost:3000


