const express = require('express');
// const mongoose = require('./db/mongoose');
// const Todo = require("./models/Todo");
// const user = require("./models/user");
const hbs = require('hbs');
const port = process.env.PORT | 3000;

const app = express();

hbs.registerPartials(__dirname + '/../views/partials')

hbs.registerHelper('copyRight', () => {
    return new Date().getFullYear()
})

hbs.registerHelper("uppercase", (text) => { // pass argument and convert to upper case 
    return text.toUpperCase()
})

app.set('view engine', 'hbs');  

app.use((req, res, next) => {
    const now = new Date()
    const log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    next();
})

app.use(express.static( __dirname + '/../public'));

app.get("/", (req, res) => {
    res.render("home.hbs", {
        message: "welcome to my website",
        date: new Date(),
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "sample webapp",
    });
})



// app.post("/todos", (req, res) => {
//     let todo = new Todo ({
//         text: req.body.text,
//     });

//     todo.save().then((doc) => {
//         res.send(doc);
//     }, (e) => {
//         res.send(e);
//     });
// });

// const port = process.env.PORT || 3000;

// app.get('/', function (req, res) {
//     res.send('res....');
// })

// app.get('/about', function(req, res) {n

//     //                 age : 22
//     //             }, 
//     //             {
//     //                 name: 2,
//     //                 age : 33
//     //             }
//     //         ],
//     // })
//     // res.send('about the page..')
//     res.render('about.hbs', {
//         pageTitle: "sample webapp",
//         copyRight: 2016
//     });
// })

// app.get('/home', (req, res) =>  {
//     res.render('home.hbs', {
//         header: "demo app",
//         copyRight: 2019
//     });
// })

app.listen((port), () => {
    console.log(`port is up on:${port}`);
});