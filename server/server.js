require("./config/config");
const express = require('express');
const bodyParser = require("body-parser");
const {Todo} = require("./models/Todo");
const  {User} = require("./models/User");
const {mongoose} =  require("./db/mongoose");
const{ObjectId}  =  require("mongodb");
const _ = require('lodash');
const {authenticate }  = require("./middleware/authenticate");

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res)=> {
    console.log("req", req.body);
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    })

    todo.save().then(result=> {
        res.send(result);
    }, err=> {
        res.status(400).send(err);
    });
});

app.post('/users/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
     
    user.save().then(() => {
        // res.send(result);
        
        return user.generateAuthToken();
    }).then((token) => {
       res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get("/users/user", authenticate,  (req, res) => {
    res.send(req.user);
    
});


app.get('/todos', (req, res)=> {
    Todo.find().then(result => {
        res.send(result);
    }, e => {
        res.status(400).send(e);
    });
});

// get by id

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid()) {
       return res.status(404).send();
    }
    Todo.findById(id).then(result => {
        if (!result) {
            return res.status(404).send();
        }
        res.send({result});
    },e => {
        res.status(400).send(e);
    });
}, err => {
    res.status(400).send(e);
});

// delete api
app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    console.log("delete todo by id");
    Todo.findByIdAndRemove(id).then(result => {
        console.log("after deletionresult", result);
        res.send(result);
    }, err => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((result) => {
        if (!result) {
            res.status(404).send();
        }
        console.log("update", result);
        res.send({result});

    }).catch((e) => {
        res.status(400).send();
    });

});




app.listen(3000, () => {
    console.log("app running--")
});