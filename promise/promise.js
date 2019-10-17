const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) =>  {
        setTimeout(() => {
            if (typeof a === "number" && typeof b === "number") {
                resolve(a+b);
            } else {
                reject("only number type allowed");
            }
        }, 1000);
    });
}


asyncAdd(5, 6).then((res) => {
    console.log("res", res);
    return asyncAdd(res, "32");
}).then(res => {
    console.log("should be 43", res);
}).catch((error) => {
    console.log("error", error);
});









// const somePromise = new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve("hey it's working....");
//     // }, 2500);
//     reject("hey its not working");
// });

// somePromise.then((message) => {
//     console.log(message);
// },(error) => {
//     console.log("error--", error);
// });