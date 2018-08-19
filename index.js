require('dotenv').config();

const path = require('path');

const express = require('express');
const app = express();
const PORT = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const ebayAPI = require('./ebayAPI');
app.post('/sold-listings', async (req, res) => {
  let listings = await ebayAPI.findCompletedItems(req);
  res.send(listings);
});

app.post('/active-listings', async (req, res) => {
  let listings = await ebayAPI.findItemsAdvanced(req);
  res.send(listings);
});


if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, '/client/build/')));
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  })
} 

app.listen(PORT);