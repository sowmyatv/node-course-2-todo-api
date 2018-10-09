const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../schemas/Todo');

const seedData = [
    {
        _id : new ObjectID(),
        text: "first text from seed"
    },
    {
        _id : new ObjectID(),
        text: "second text from seed"
    }
];
beforeEach((done)=>{
    Todo.remove({}).then(() => {
        Todo.insertMany(seedData);
    }).then(() => {
        done();
    });
    
});

describe ('POST /todos', () => {

    it ('should create a new todo',  (done) => {
        var text = 'example text';
        request (app)
        .post('/todos')
        .send({text: text})
        .expect(200)
        .expect ((res) => {
            expect(res.body.text).toBe(text);
        }).end ( (err, res) => {
            if (err){
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch ((e) => {
                done(e);
            })
        })
    });


    it('should not create a new todo with invalid text', (done) => {
        text = '';
        request(app)
        .post('/todos')
        .send({text})
        .expect(400)
        .end ((err, res)=> {
            if (err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch ((e) => {
                done(e);
            })
        })
    });
});

describe ('GET /Todos', () => {

    it('should get all records', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end (done);
        
    });
});


describe ('GET /Todos/:id', () => {
    it('should return todo record', (done) => {
        var id = seedData[0]._id.toHexString();
        var url = '/todos/'+ id;
        //console.log("url is " + url);
        request(app)
        .get(url)
        .expect(200)
        .expect((res) => {
            //console.log(res.body.todo);
            expect(res.body.todo.text).toBe(seedData[0].text);
        })
        .end(done);
    });
});

