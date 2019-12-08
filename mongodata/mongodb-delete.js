// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');

// let obj = new ObjectId();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/Todoapp', (err, db) => {
    if (err) {
        console.log('unable to get data');
    }
    console.log('connected to mongo server');
    // deleteMany
    // db.collection('Todos').deleteMany({text: 'something to do'}).then((result) => {
    //     console.log("result", result);
    // }, (err) => {

    // })

    //deleteOne
    // db.collection('Todos').deleteOne({_id : new ObjectId('5cb2165da7986c07bb5b505b')}).then((result) => {
    //     console.log('deleted successfully', result);
    // }, (err) => {

    // })

    // FindOne and delete

    db.collection('users').findOneAndDelete({name: "rohit"}).then(result => {
        console.log("deleted", result);
    })

    db.close();
});