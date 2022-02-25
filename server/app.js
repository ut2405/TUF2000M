const express = require('express');
const app = express();
const path = require('path');
const port=process.env.PORT || 8000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
//require('./db/db');
app.use('/tuf/v1', require('./routes/routes'));
app.listen(port);
console.log('App Runs on '+port);

// Accessing the path module


// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});