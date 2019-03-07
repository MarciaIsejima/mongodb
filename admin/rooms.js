var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const assert = require('assert');
var router = express.Router();
module.exports = router;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'chat';

// Create a new MongoClient
const client = new MongoClient(url);

router.get('/', function (req, res) {
  
  // Use connect method to connect to the Server
  client.connect(function(err) {

    assert.equal(null, err);
    
    const db = client.db(dbName);

    const collection = db.collection('rooms');

    // Find some documents
    collection.find({}).toArray(function(err, rooms) {
      assert.equal(err, null);

      res.render("rooms/list", {
        title: "Admin Rooms",
        rooms: rooms
      });

      });
    
  });

});

router.route('/add')
  .get(function (req, res) {
    res.render("rooms/add");
  })
  .post(function (req, res) {
    var room = {
      name: req.body.name,
    };

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function(err) {

      assert.equal(null, err);
      const db = client.db(dbName);

      const collection = db.collection('rooms');

      // Insert a new chat room
      collection.insertOne(room, function(err, result) {
        
        res.redirect(req.baseUrl);

      });
    
    });
    
  });

router.route('/edit/:id')
  .all(function (req, res, next) {
    var roomId = req.params.id;

    // Use connect method to connect to the Server
    client.connect(function(err) {

      assert.equal(null, err);
      
      const db = client.db(dbName);

      const collection = db.collection('rooms');

      // Find the room with the given id
      var filter = { _id: new ObjectID(roomId) };
      collection.find(filter).next(function(err, room) {
        
        if (!room) {
          res.sendStatus(404);
          return;
        }
        res.locals.room = room;
        next();

        // db.close();

        });
      
    });

  })
  .get(function (req, res) {
    res.render("rooms/edit");
  })
  .post(function (req, res) {
    var roomId = req.params.id;

    // Use connect method to connect to the Server
    client.connect(function(err) {

      assert.equal(null, err);
      const db = client.db(dbName);

      const collection = db.collection('rooms');

      var filter = { _id: new ObjectID(roomId) };

      // Update a chat room
      var newRoom = {
        name: req.body.name
      };
      collection.replaceOne(filter, newRoom, function(err, result) {
        
        res.redirect(req.baseUrl);

      });
    
    });

  });

router.get('/delete/:id', function (req, res) {
  var roomId = req.params.id;

  // Use connect method to connect to the Server
  client.connect(function(err) {

    assert.equal(null, err);
    const db = client.db(dbName);

    const collection = db.collection('rooms');

    var filter = { _id: new ObjectID(roomId) };

    // Insert a new chat room
    collection.deleteOne(filter, function(err, result) {
      
      res.redirect(req.baseUrl);

    });
  
  });

});
