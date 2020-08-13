require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./database/queries');
const CryptoJS = require("crypto-js");
const AES_Code = require('./AES').AES_Code;
 
const app = express();
const port = process.env.PORT || 4000;
 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.post('/auth', async (req, res) => {
    try {
      const userData = await db.getUserData(req.body.username);

      if (userData[0].isAdmin === false) {
          res.send(false);
      }

      const storedBytes = CryptoJS.AES.decrypt(userData[0].password, AES_Code);
      const storedPWD = storedBytes.toString(CryptoJS.enc.Utf8);
      const attemptedBytes = CryptoJS.AES.decrypt(req.body.password, AES_Code);
      const attemptedPWD = attemptedBytes.toString(CryptoJS.enc.Utf8);

      if (storedPWD === attemptedPWD) {
          res.send(true);
      } else {
          res.send(false)
      }
    } 
    catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
});

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