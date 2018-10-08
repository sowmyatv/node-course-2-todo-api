const {MongoClient} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
       return console.log("Could not connect to MongoDb Server");
    }

    console.log("Connected to the mongo server");

    db.collection('Todos').find().toArray().then((res)=>{
        console.log(JSON.stringify(res,undefined,2));
    }, (err) => {
        console.log("Error in finding");
    });

    db.collection('Users').find({name : 'Venkat S'}).toArray().then((res)=> {
        console.log(JSON.stringify(res, undefined, 2));
    }, (err) => {
        console.log("error in finding Sowmya");
    });

    
    db.close();
});