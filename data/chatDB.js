var mongoose = require("mongoose");

const url = 'mongodb://localhost:27017/chat';
var connectMongoose =mongoose.connect(url);

var User = require('../admin/userModel');
var Room = require('../admin/roomModel');

module.exports = {
  connectMongoose,
  User,
  Room
}