const fs = require('fs');

const fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes-data.json')); // handling case when notes-data.json not exist
    } catch(e) {
        return []; 
    }
}

const saveNotes = (notes) => {
    return fs.writeFileSync('notes-data.json', JSON.stringify(notes)); // write into notes-data.json
}

 const addNote = (a, b) => {
    console.log("a and b is", a, b);
    if(a && b) {
        let notes = fetchNotes(); // fetch notes if exist
        let note = {
            a,
            b
        };
    // debugger;
        const duplicates = notes.filter((note) => note.b === b);
        if (duplicates.length === 0) {
            notes.push(note);
            // console.log("notes format", notes);
            saveNotes(notes); 
            return notes;
        } 
        return 0;
       
    }   
 };


 const removeNote = (a, b) => {
    let notes = fetchNotes();
    const removed = notes.filter((note) => note.a !== a);
    console.log("removed..", removed);
    saveNotes(removed); // save note after removig note
 }

 const getNotes = () => {
   return fetchNotes();
 }

 module.exports = {
   addNote, removeNote, getNotes
 };