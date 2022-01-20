const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost:27017/testDB";   

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = mongoose.connection;