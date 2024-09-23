const mongoose = require("mongoose");
const config =require("config");

const dbgr = require("debug")("development:mongoose");
//setup environment variable . // use to debug the code and find the error during the devlopment phase.

// .connect("mongodb://127.0.0.1:27017/SCATCH")
mongoose
.connect(`${config.get("MONGODB_URI")}/SCATCH`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;
// we can share connection accross the file with use of mongoose.connection.
// only app.js file jj run thai te mate aa file ne tema connect karavi pade te mate apne kai to exports karvu pade te mate aapne mongoose.conection exports karu che.

// this run in terminal
// $env:DEBUG="development:*"
// node app.js
