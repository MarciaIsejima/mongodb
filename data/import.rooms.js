const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var rooms = require(__dirname+"/rooms.json");

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'chat';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {

    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // findDocuments(db, function() {
    //     client.close();
    // });

    insertDocuments(db, function(){
        client.close();
    })

});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
}

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('rooms');
    // Insert some documents
    collection.insertMany(rooms, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted documents into the rooms collection");
      callback(result);
    });
  }