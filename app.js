const fs = require('fs');
const notes = require('./notes.js');
const yargs = require('yargs');
const _ = require('lodash');

//adding logic to accept commands and options
const title = {
  describe: 'title for the note',
  demand: true,
  alias: 't'
};

const body = {
  describe: 'body of the note',
  demand: true,
  alias: 'b' //can use array too - eg. ['a','b']
};

var argv = yargs
.command('add','Add a note',{
  title,
  body
})
.command('list','get a list of all the notes')
.command('read','get a note based on title',{
  title
})
.command('remove','remove a note based on title',{
  title
})
//.help('h')
.argv;

var command = argv._[0]; //process.argv[2];
//console.log(`Command ${command}`);

//add command
if (command === 'add'){
var note = notes.addNote(argv.title,argv.body);
if(note){
  console.log('Note added successfully.');
  notes.logNote(note);
}
else{
  console.log('Note aleady present');
  }
}
//list command
else if (command === 'list'){
var listNote = notes.getAll();
if(listNote){
  console.log(`Printing ${listNote.length} note(s).`);
  listNote.forEach((note) => {
  notes.logNote(note);
});
}
else{
  console.log('No note found.');
  }
}
//read command
else if (command === 'read'){
var getNote = notes.getNote(argv.title);
if(getNote){
  notes.logNote(getNote);
}
else{
  console.log('Note not found');
  }
}
//remove command
else if (command === 'remove'){
var noteRemove = notes.removeNote(argv.title);
var message = noteRemove ? 'Note was removed.' : 'Note not found';
console.log(message);
}
else {
  console.log('Command not recognized');
};
