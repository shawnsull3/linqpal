require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
 
const app = express();
const port = process.env.PORT || 4000;
 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});