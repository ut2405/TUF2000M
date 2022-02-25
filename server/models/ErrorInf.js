const mongoose =require('mongoose');
require("dotenv").config();
const url=process.env.DB_HOST;

const ERRORinfSchema = new mongoose.Schema({
"Bit": Number,
"Error": String,
}, { timestamps: true });

mongoose.Promise=global.Promise;
mongoose.connect(url,{useNewUrlParser: true});
module.exports= mongoose.model('ERRORinf',ERRORinfSchema);