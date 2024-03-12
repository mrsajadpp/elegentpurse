let connectToMongoDB = require('./config');

let db = connectToMongoDB(process.env.MONGO_STRING, 'elegentpurse');