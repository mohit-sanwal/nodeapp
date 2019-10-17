// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');

// let obj = new ObjectId();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/Todoapp', (err, db) => {
    if (err) {
        console.log('unable to get data');
    }
    console.log('connected to mongo server');
    db.collection('Todos').insertOne({
        text: 'something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            console.log('unable to connect');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })
    db.close();
});