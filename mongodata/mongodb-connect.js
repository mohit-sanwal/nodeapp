// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');

// let obj = new ObjectId();
// console.log(obj);

// const a = {name: "mohit", age:25, location: "gurgaon"}
// const {location, name, age} = a

// console.log(location);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('unable to get data');
    }
    console.log('connected to mongo server');

    // inserting an element in mongodb

    // db.collection('StudentCollection').insertOne({
    //     name: 'mac',
    //     class: 12,
    // }, (err, result) => {
    //     if (err) {
    //         console.log('unable to connect');
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

//    db.collection("users").insertOne({
//        name: "rohit",
//        age: 26,
//        location: "gurgaon"
//    }, (err, result) => {
//         if (err) {
//             console.log("unable to connect");
//         }
//         console.log(JSON.stringify(result.ops, undefined, 2));
//    });
    db.close();
});