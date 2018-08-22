require('dotenv').config();

const path = require('path');

const express = require('express');
const app = express();
const PORT = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const ebayAPI = require('./ebayAPI');
const transformAPIData = require('./transformAPIData');

app.post('/sold-listings', async (req, res) => {
  let ebayAPIData = await ebayAPI.findCompletedItems(req);
  let transformedData = transformAPIData(req, ebayAPIData);
  res.json(transformedData);
});

app.post('/active-listings', async (req, res) => {
  let ebayAPIData = await ebayAPI.findItemsAdvanced(req);
  let transformedData = transformAPIData(req, ebayAPIData);
  res.json(transformedData);
});


if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, '/client/build/')));
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  })
} 

app.listen(PORT);