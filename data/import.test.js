var MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017";
const dbName = 'chat';

const client = new MongoClient(url);

client.connect(function(err) {
// MongoClient.connect(url, function(error, db){
  const db = client.db(dbName);
  db.collection("rooms").find().toArray(function(error, rooms){
    if (error) {
      console.log(error);
      return;
    }
    console.log(rooms);
  });
});

