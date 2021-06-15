/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const TableLogger = require('./core/database/Table');

const collectionsRouter = require('./routes/collection');
const essaysRouter = require('./routes/essay');
const storyRouter = require('./routes/story');
const poemsRouter = require('./routes/poem');

const app = express();

const port = process.env.PORT || 4040;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

// meta info
app.get('/', (req, res) => res.json({ api: 'ITS ALIVE' }));
app.get('/log/:table', TableLogger.retrieveTableInfo);

// routes
app.use('/api/collections', collectionsRouter);
app.use('/api/essays', essaysRouter);
app.use('/api/stories', storyRouter);
app.use('/api/poems', poemsRouter);

app.listen(port, () => console.log(`server\'s fucking ready 🤠 yeehaw`));
