/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const DBM = require('./core/database/DBManager');

const db = new DBM({
  host: process.env.MYSQL_LOCAL_HOST,
  user: process.env.MYSQL_LOCAL_USER,
  password: process.env.MYSQL_LOCAL_PW || '',
  database: process.env.MYSQL_LOCAL_DB,
});

const connection = db.connect(db._config);
console.log(connection);

const app = express();

const port = process.env.PORT || 4040;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log('ping');
  res.json({ live: 'wire' });
});

app.listen(port, () => console.log('server\'s fucking ready 🤠 yeehaw'));
