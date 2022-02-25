const mongoose =require('mongoose');
require("dotenv").config();
const url=process.env.DB_HOST;

const TUF2000MinfSchema = new mongoose.Schema({
"Register": Number,
"Number": Number,
"VName": String,
"Format": String,
"Unit": String,
"value": String,
"rbvalue": String,
}, { timestamps: true });
mongoose.Promise=global.Promise;
mongoose.connect(url,{useNewUrlParser: true});
module.exports=mongoose.model('TUF2000Minf',TUF2000MinfSchema);