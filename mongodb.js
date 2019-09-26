const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'simple-task-manager';

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5d8a627ac1b3402860c2cf1d")
    // },{
    //     $inc: {
    //         age: -1,
    //     }
    // }).then(result => {
    //     console.log(result);
    // }).catch(error=> {
    //     console.log(error)
    // })

    // db.collection('users').findOne({ name: 'Dula' }, (error, user) => {
    //     if (error) {
    //         console.log('Could not fetched data');
    //     }

    //     {
    //         !user ? console.log('No user entry') : console.log(user);
    //     }
    // })

    // db.collection('task').findOne({_id: new ObjectID("5d8b9c345e13b530f8f6f72d")}, (error, task)=>{
    //     console.log(task);
    // })
    // db.collection('task').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then(result => {
    //     console.log(result.modifiedCount);
    // }).catch(error => {
    //     console.log(error);
    // })

    db.collection('users').deleteMany({
        age: 22
    }).then(result=>{
        console.log(result);
    }).catch(error=>{
        console.log(error);
    })
});