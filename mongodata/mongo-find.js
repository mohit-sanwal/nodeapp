// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');

// let obj = new ObjectId();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/Todoapp', (err, db) => {
    if (err) {
        console.log('unable to get data');
    }
    console.log('connected to mongo server');
    db.collection('Todos').find({_id: new ObjectId('5cb1c597e77a1914fa2b2a2a')}).count().then((docs) => {
        console.log("docs", docs);
    },(err) => {
        console.log('unable to fetch data', err);
    })
    db.close();
});