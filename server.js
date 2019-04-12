const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send('res....');
})

app.get('/about', function(req, res) {
    // res.send({
    //     clg : "bias",
    //     stu: [
    //             {
    //                 name: 1,
    //                 age : 22
    //             }, 
    //             {
    //                 name: 2,
    //                 age : 33
    //             }
    //         ],
    // })
    // res.send('about the page..')
    res.render('about.hbs', {
        pageTitle: "sample webapp",
        copyRight: 2016
    });
})

app.listen(3000);