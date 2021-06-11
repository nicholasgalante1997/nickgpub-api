/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const db = require('./core/database/DBManager');

const collectionsRouter = require('./routes/collection');

const app = express();

const port = process.env.PORT || 4040;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => res.json({ api: 'ITS ALIVE' }));

app.use('/api/collections', collectionsRouter);

app.get('/log/:table', async (req, res) => {
  const { table } = req.params;
  const log = await db.query(`DESCRIBE ${table}`);
  res.json({ log });
});

app.listen(port, () => console.log(`server\'s fucking ready 🤠 yeehaw \n spotify port ${port}`));
