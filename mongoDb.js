const MongoClient = require('mongodb').MongoClient;

let db = null;
let client = null;

const connect = async () => {
  client = await MongoClient.connect('mongodb://localhost');
  db = client.db('music');
};

const disconnect = async () => {
  await client.disconnect();
};

module.exports = {
  connect,
  disconnect,
  getDb: () => db
};