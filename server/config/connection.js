const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost/social_stories";   

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = mongoose.connection;