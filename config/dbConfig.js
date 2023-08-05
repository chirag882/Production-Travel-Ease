const mongoose = require("mongoose");

const connectDatabase = async() => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.mongo_url).then((data)=>{
        console.log(`MongoDB connected with server: ${data.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })
    // await mongoose.connect('mongodb://localhost:27017');
}

module.exports = connectDatabase;