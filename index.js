if (process.env.NODE_ENV !== 'production') require('dotenv').config(); 

const path = require('path');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const ebayAPI = require('./ebayAPI');
const isInvalidAPIData = require('./isInvalidAPIData');
const transformAPIData = require('./transformAPIData');

app.get('/sold-listings', async (req, res) => {
  let ebayAPIData = await ebayAPI.findCompletedItems(req);
  if (isInvalidAPIData(ebayAPIData)) return res.json([]);

  let transformedData = transformAPIData(ebayAPIData);
  res.json(transformedData);
});

app.get('/active-listings', async (req, res) => {
  let ebayAPIData = await ebayAPI.findItemsAdvanced(req);
  if (isInvalidAPIData(ebayAPIData)) return res.json([]);

  let transformedData = transformAPIData(ebayAPIData);
  res.json(transformedData);
});


if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, '/client/build/')));
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  })
} 

app.listen(PORT);