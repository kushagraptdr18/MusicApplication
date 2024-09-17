const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Music').then(function(){
    console.log("Database connected"); 
}).catch(function(err){
    console.log(err);  
})


let db = mongoose.connection;

module.exports=db;