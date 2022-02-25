const express = require('express');
const app = express();
//var path = require('path');
const port=process.env.PORT || 8000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
//require('./db/db');
app.use('/tuf/v1', require('./routes/routes'));
app.listen(port);
console.log('App Runs on '+port);


  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });


