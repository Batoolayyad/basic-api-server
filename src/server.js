'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const routerForFoods=require('./routes/food');
const routerForClothes=require('./routes/clothes');
const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.use('/api/v1/foods',routerForFoods);
app.use('/api/v1/clothes',routerForClothes);

app.use('*', notFoundHandler);
app.use(errorHandler);
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
  