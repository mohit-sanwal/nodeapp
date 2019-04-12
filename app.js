const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
// console.log(process);
const command = process.argv[2];
const argv = yargs.argv;


console.log("argv..", argv);

if (argv._[0] === "add") {
    // notes.addNote(argv.title, argv.name);
    // console.log(`you ${argv.title} is`, notes.addNote(argv.title, argv.name));
    const note = notes.addNote(argv.title, argv.name);
    console.log("note is ::", note);
    if (note) {
        console.log("note created successfully", note);
    } else if(note != undefined) {
        console.log("node name taken already..");
    } else {
        console.log("something went wrong");
    }
} else if (argv._[0] === "remove") {
    notes.removeNote(argv.title, argv.name);
} else if (argv._[0] === "read") {
    notes.getNotes();
    console.log("...get node",  notes.getNotes());
} else if (argv._[0] === "list") {
    // list
}
    