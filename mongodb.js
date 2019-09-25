const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'simple-task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    } 
    
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Salim',
    //     age: 22
    // }, (error, result)=>{
    //     if(error){
    //         return console.error('Unable to insert document.');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Sagor',
    //         age: 17
    //     },
    //     {
    //         name: 'Dola',
    //         age: 9
    //     }
    // ], (error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert data');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('task').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     },{
    //         description: 'Renew inspection',
    //         completed: false
    //     },{
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         console.log('Unable to insert Task!');
    //     }
    //     console.log(result.ops);
    // });
});