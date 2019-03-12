var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
  
var schemaOptions = {
  collection: "users"
};

var schema = mongoose.Schema({
  alias: String,
  roles: [String],
  contact: {
    phone: String,
    email: String
  },
  address: {
    lines: [String],
    city: String,
    state: String,
    zip: String
  }
},schemaOptions);

module.exports = mongoose.model("model", schema);