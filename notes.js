const fs = require('fs');

var readNote = () => {
try{
var file = fs.readFileSync('notes-data.json');
return JSON.parse(file);
  } catch(e){
return [];
  };
};

var saveNote = (notes) => {
  fs.writeFileSync('notes-data.json' , JSON.stringify(notes));
};

var addNote = (title,body) => {
var notes = readNote();
var note = {
  title,
  body
};

var duplicateTitle = notes.filter((note) => note.title === title);
if(duplicateTitle.length === 0){
  notes.push(note);
  saveNote(notes);
  return note;
}
};

var getAll = () => {
  return readNote();
};

var getNote = (title) => {
  var getNote = readNote();
  var getTitle = getNote.filter((note) => note.title === title);
//  if (getTitle.length !== 0){
    return getTitle[0];
};

var removeNote = (title) => {
var curNote = readNote();
var newNote = curNote.filter((note) => note.title !== title);
saveNote(newNote);
return curNote.length !== newNote.length;
};

var logNote = (note) => {
  console.log('--');
  console.log('title: ',note.title);
  console.log('body: ',note.body);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
