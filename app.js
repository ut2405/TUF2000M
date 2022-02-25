const express = require('express');
const app = express();
const path = require('path');
const port=process.env.PORT || 8000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
//require('./db/db');
app.use('/tuf/v1', require('./server/routes/routes'));
app.listen(port);
console.log('App Runs on '+port);


  // Serve any static files
  app.use(express.static(path.resolve("./client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (request, response) {
    response.sendFile(path.resolve("./client/build", "index.html"));
  });


