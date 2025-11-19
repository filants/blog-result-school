require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();

// Serve frontend
app.use(express.static(path.resolve(__dirname, '..', 'frontend', 'dist')));

app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/api', routes);

// Catch-all for SPA (Express 5 safe)
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

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
