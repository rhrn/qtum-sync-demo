# Qtum blockchain syncer (demo)

### Stack
  - [x] [Mongodb](https://www.mongodb.com/) + [Mongoose](http://mongoosejs.com/)
  - [x] [Node.js](https://nodejs.org/)
  - [x] Typescript(https://www.typescriptlang.org/)
  - [x] [Nest.js](https://nestjs.com/)
  - [x] [Jest](http://jestjs.io/)
  - [x] [Docker](https://www.docker.com/)

### Docker local install
```
docker-compose -f stack/qtum-sync-single.yml up
# after builds open http://localhost:3000
```

### Dev Install
* Chain + Database
```
docker-compose -f stack/qtum-local.yml up -d
docker-compose -f stack/mongo-local.yml up -d
```

* Packages
```
npm install
```

* Test
```
npm test
```

* Lint
```
npm run lint
```

* Run
```
npm start
```

### Endpoints
```
GET `/` - get service info
GET `/stats` - sync stats
```

### TODO 
```
POST `/pause` - pause service
POST `/unpause` - unpause service
POST `/height` - set height
```
