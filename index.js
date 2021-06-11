/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const Collection = require('./models/collections/Collection');

const db = require('./core/database/DBManager');

const app = express();

const port = process.env.PORT || 4040;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => res.json({ why: 'of fry' }));

app.get('/api/collections', async (req, res) => {
  const collections = await Collection.read();
  res.json({ collections });
});

app.get('/api/collections/:id', async (req, res) => {
  const { id } = req.params;
  const record = await Collection.readById(id);
  res.json({ record });
});

app.post('/api/collections', async (req, res) => {
  const { collection } = req.body;
  const entry = await Collection.create(collection);
  res.json(entry);
});

app.get('/log', async (req, res) => {
  const log = await db.query('DESCRIBE collections');
  res.json({ log });
});

app.listen(port, () => console.log(`server\'s fucking ready 🤠 yeehaw \n spotify port ${port}`));
