/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const TableLogger = require('./core/database/Table');

const collectionsRouter = require('./routes/collection');
const essaysRouter = require('./routes/essay');
const storyRouter = require('./routes/story');
const poemsRouter = require('./routes/poem');
const adminRouter = require('./routes/admin');

const app = express();

const port = process.env.PORT || 4040;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => res.json({ api: 'ITS ALIVE' }));
app.get('/log/:table', TableLogger.retrieveTableInfo);

app.get('/test-cookie', (req, res) => {
  res.cookie('name', 'sample').json({ cookie: 'sent' });
});

app.get('/test-get-cookie', (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

// routes
app.use('/api/collections', collectionsRouter);
app.use('/api/essays', essaysRouter);
app.use('/api/stories', storyRouter);
app.use('/api/poems', poemsRouter);
app.use('/api/admin', adminRouter);

app.listen(port, () => console.log("server's fucking ready 🤠 yeehaw"));
