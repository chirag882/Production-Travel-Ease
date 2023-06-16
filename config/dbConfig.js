const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.mongo_url).then((data)=>{
        console.log(`MongoDB connected with server: ${data.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDatabase;