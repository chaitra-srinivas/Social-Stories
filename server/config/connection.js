const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost/testDB";   

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = mongoose.connection;