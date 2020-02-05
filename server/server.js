require("./config/config");
const express = require('express');
const bodyParser = require("body-parser");
const {Todo} = require("./models/Todo");
const  {User} = require("./models/User");
const {Post} = require("./models/Post");
const {mongoose} =  require("./db/mongoose");
const{ObjectId}  =  require("mongodb");
const _ = require('lodash');
const {authenticate }  = require("./middleware/authenticate");
var cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const app = express();

app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() +file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file cb(null, false)
    // accept a file cb(null, true)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null , true);
    }
}

const Upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});



const port  = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(cors())


app.post('/add-post', Upload.single('postImage'), (req, res) => {
    console.log(req.body.post, req.body.userId, req.file.path, req.body.postImage)
    const post = new Post({
        post: req.body.post,
        userId: req.body.userId,
        postImage: req.file.path
    })
    post.save().then((result) => {
        res.status(200).send(result);
    },(err) => {
        res.status(400).send(err);
    })
})

app.post('/todos', (req, res)=> {
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


app.post('/users/register', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    
    User.findOne({email: user.email}, (err, data) => {
        if (!data) {
            user.save().then((result) => {
                return user.generateAuthToken();
            }).then((token) => {
                user.tokens = token
               res.header('x-auth', token).send(user);
            }).catch((e) => {
                res.status(400).send(e);
            })
        } else if (data) {
            return res.status(400).send({message: "this email is already exist on database"});
        }
        if (err) {
            console.log("e", err);
        }
    }).catch((e) => {
        console.log("e", e);
    });
})

app.post('/users/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    User.findOne({email: user.email}).then((result) => {
        bcrypt.compare(user.password, result.password, (err, response) => {
            if (response) {
                res.send(result);
            } else{
                res.status(400).send({message: "password didn't match"});
            }
            if (err) {
                res.status(400).send(e);
                console.log(err);
            }
        })
    }).catch((e) => {
        res.status(400).send(e);
    })


    // user.save().then((result) => {
    //     // res.send({result});
    //     // console.log("request--", result);
    //     return user.generateAuthToken();
    // }).then((token) => {
    //     user.tokens = token
    //     console.log("request--", user);
    //    res.header('x-auth', token).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })



    
    // if (!req.body.email || !req.body.password) {
    //     return res.status(404).send();
    // }
    // var body = _.pick(req.body, ['email', 'password']);
    // var user = new User(body);
    
     
    // user.findOne({email:req.body.email, password:req.body.password}).then((result) => {

    //     // res.send({result});
    //     // console.log("request--", result);
    //     // return user.generateAuthToken();
    // }).then((token) => {
    //     user.tokens = token
    //     console.log("request--", user);
    //    res.header('x-auth', token).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

app.get('/users',  (req, res)=> {
    User.find().then(result => {
        res.send(result);
    }, e=> {
        res.status(400).send(e);
    })
});

app.get('/all-posts',  (req, res)=> {
    Post.find().then(result => {
        res.send(result);
    }, e=> {
        res.status(400).send(e);
    })
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


app.get("/userDetails/:id",  (req, res) => {
    // console.log("req.params.id;", req.params.id);
    // const id = req.params.id;
    // if (!ObjectId.isValid()) {
    //     return res.status(404).send();
    // }
    var id = req.params.id;
    const response = {}
    console.log("id", id);
    User.find({_id: id }).then((result) => {
        // console.log("result", result);
        response.email = result[0].email
        response.userId = result[0].id
        if (!result) {
            return res.status(404).send();
        }
        res.send({result});
    },e => {
        res.status(400).send(e);
    });
});


app.post("/post/like/:postId/:userId", (req, res) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    Post.find({_id: postId}).then
})



app.get("/my-post/:id",  (req, res) => {
    // console.log("req.params.id;", req.params.id);
    // const id = req.params.id;
    // if (!ObjectId.isValid()) {
    //     return res.status(404).send();
    // }
    var id = req.params.id;
    const response = {}
    console.log("id", id);
    Post.find({userId: id }).then((result) => {
        if (!result) {
            return res.status(404).send();
        }
        res.send({result});
    },e => {
        res.status(400).send(e);
    });
});

// delete api
app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then(result => {
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
        res.send({result});

    }).catch((e) => {
        res.status(400).send();
    });

});




app.listen(port, () => {
    console.log(`started up at port ${port}`)
});