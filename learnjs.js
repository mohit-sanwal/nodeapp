

// console.log(a);
// const a = 5;
// if (true) {
//     var b;
//     a = 7
//     console.log(a);
// }
// console.log(a);

// scoping and the scope chain

// *== scope chain works from inside to outside

// var a = "hello";
// first();
// function first() {
//     var b = "hi";
//     second();
//     function second() {
//         var c = "Hey";
//         third() // third() will be accesible from here as it will look till global scope.
//     }
   
// }

// function third() {
//     var d = "John";
//     console.log(c); // c is not defined because third() function can not access a variable which is in inner scope.
// }



/* =============================  This keyword ================== */

var a = 5;
console.log(this);


// killall -9 node


