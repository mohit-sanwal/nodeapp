const request = require("request");

request({url: "", json:true},(error, response, body) => {
});


const getUser =  (id, callback) => {
    const user = {
        id : id,
        name : "mac"
    };
    callback(user);
}

getUser(31, (userObj)=> {
    console.log("user Obj", userObj);
})