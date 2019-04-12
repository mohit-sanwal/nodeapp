const fs = require('fs');

let originalNote = {
    "name": "somename",
    "body": "somebody",
}
console.log(typeof originalNote);

let originalNoteString = JSON.stringify(originalNote);
console.log(typeof originalNoteString);
fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');
const note = JSON.parse(noteString);
console.log(typeof note);