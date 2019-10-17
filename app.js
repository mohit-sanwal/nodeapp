const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
// console.log(process);
// const command = process.argv[2]; 




const titleOption = {
    describe: "title of node",
    demand: true,
    alias: "t"
};
const bodyOption = {
    describe: "body of node",
    demand: true,
    alias: "b"
};

const argv = yargs
.command("add", "add a new node", {
    title: titleOption,
    body: bodyOption
})
.command("read", "reaad a node")
.command("remove", "remove a node", {
    title: titleOption,
    body: bodyOption
})
.command("list", "list the node")
.help()
.argv;

// console.log("modole.age", notes.age);
console.log("argv..", argv);

const command = argv._[0];
if (command === "add") {
    // notes.addNote(argv.title, argv.name);
    // console.log(`you ${argv.title} is`, notes.addNote(argv.title, argv.name));
    const note = notes.addNote(argv.title, argv.body);
    console.log("note is ::", note);
    if (note) {
        console.log("note created successfully", note);
    } else if(note != undefined) {
        console.log("node name taken already..");
    } else {
        console.log("something went wrong");
    }
} else if (command === "remove") {
    const noteRemoved = notes.removeNote(argv.title, argv.name);
    const msg = noteRemoved ? "note removed successfully" : "note not found..";
    console.log(msg);
} else if (command === "read") {
    notes.getNotes();
    console.log("...get node",  notes.getNotes());
} else if (command === "list") {
    notes.logNotes();
}





    