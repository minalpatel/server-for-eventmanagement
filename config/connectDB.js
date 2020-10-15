const mongoose = require('mongoose');
const config = require('config');

const dbconn = config.get('mongoDBconnectURI');

const connectDB = async () => {
    try{
        await mongoose.connect(dbconn);
        console.log("daabase connected");

    }catch(err){
        console.log('unable to connect');
        process.exit();
    }
};

module.exports = connectDB;
