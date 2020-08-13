require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./database/queries');
 
const app = express();
const port = process.env.PORT || 4000;
 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/allUserData', async (req, res) => {
    try {
      const userData = await db.getAllUserData();
      res.send(userData);
    } 
    catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
});

app.post('/newUser', async (req, res) => {
    try {
      await db.createNewUser(req.body);
      res.sendStatus(201);
    } 
    catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
});
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});