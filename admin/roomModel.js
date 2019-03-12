var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
  
var schemaOptions = {
  collection: "rooms"
};

var schema = mongoose.Schema({name: String}, schemaOptions);

module.exports = mongoose.model("roomModel", schema);