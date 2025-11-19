require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', routes);
// app.use(express.static('../frontend/dist'));

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
