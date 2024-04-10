const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/school')

require('./model/studentmodel')
require('./model/classmodel')
require('./model/subjectmodel')


const db = mongoose.connection;
function dbCalling(){
    try{
        db.once('open', () => {
        console.log('Connected to MongoDB');
        });
    }
    catch(error){
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
}
dbCalling();