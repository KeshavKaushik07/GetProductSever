const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`DataBase connected to server on ${mongoose.connection.host}`.bgGreen);
    }catch(err){
        console.log(`somthing went wrong ${err}`.bgRed);
    }
}

module.exports = connectDB;