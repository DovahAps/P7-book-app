
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');  
const app = express();
const booksRoutes = require('./routes/Books.js');
const userRoutes = require('./routes/User.js');
require('dotenv').config();


app.use(express.json());

// MongoDB 
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie!'))
.catch((error) => console.log('Connexion à MongoDB failed !', error));

// CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
