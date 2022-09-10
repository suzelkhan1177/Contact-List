//require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/contacts_list_db');


//aqquire tha connection
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error contorl in db'));

db.once('open', function(){

    console.log('Successfully connected to database');
});