const {MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
       return console.log("Could not connect to MongoDb Server");
    }

    console.log("Connected to the mongo server");

    db.collection('Users').findOneAndUpdate(
        {
            _id : new ObjectID('5bbaf43d7c048e15eac74143')
        },
        {
            $inc : 
            { 
                age: 1
            }
        },
        {
            returnOriginal : false
        }
    ).then((res)=>{
        console.log(JSON.stringify(res, undefined,2));
    }, (err) => {

    });

    
    db.close();
});