var mongoose = require('mongoose');
var connectionString = 'mongodb://test:test@ds012538.mlab.com:12538/brewbros';
var connection = mongoose.connection;

mongoose.connect(connectionString);
connection.on('error', err =>{
    console.log('server error:', err);
});
connection.once('open', ()=>{
    console.log('Connected to Database');
});