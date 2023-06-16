const express = require('express')
const app = express()
require('dotenv').config();
const connectDatabase = require("./config/dbConfig");
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require("path");

// connecting to database
connectDatabase();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/build')))

const userRoute = require("./routes/userRoute");
const busesRoute = require("./routes/busesRoute");
const bookingRoute = require("./routes/bookingsRoute");

app.use("/api/users",userRoute);
app.use("/api/buses",busesRoute);
app.use("/api/bookings",bookingRoute);

app.use('*',(req,res) => {
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})