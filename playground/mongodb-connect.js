const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error, db)=>{
    if (error){
        return console.log("Unable to connect to the mongo db server");
    }
    console.log("Connected to MongoDB server");
    
    /*db.collection('Todos').insertOne({
        text : 'insert data',
        completed : false
    }, (err, result) => {
        if (err) {
          return console.log("Unable to insert data");
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });*/

    db.collection('Users').insertOne({
        _id: '123',
       name : 'Sowmya Venkat',
       age : 40,
       location : 'Bangalaore'
    }, (err,result) => {
        if (err) {
           return console.log("Error inserting into users db");
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    
    db.close();
});


