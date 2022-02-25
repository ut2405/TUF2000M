const express = require('express');
const app = express();
const port=8000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
//require('./db/db');
app.use('/tuf/v1', require('./routes/routes'));


app.listen(port);
console.log('App Runs on '+port);