const mongoose = require('mongoose');


function ConnectToDb(){
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log('Connected to database');
    }).catch((err)=>{
        console.log('Connection failed');
    });
}


module.exports = ConnectToDb;