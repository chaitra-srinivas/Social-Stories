const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social_stories", 
  { useNewUrlParser: true }
);

module.exports = mongoose.connection;
