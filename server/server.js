require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
  res.send('This is the port with the DB API');
});

// routes for graph apis
app.use('/graph-apis', require('./routes/graphs'));

// routes for info apis
app.use('/info-apis', require('./routes/info'));

module.exports = app;
