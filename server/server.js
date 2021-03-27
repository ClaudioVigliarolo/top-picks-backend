// Import dependencies
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
// Import routes
const topicsRoutes = require('./routes/topicRoutes');

const authRoutes = require('./routes/authRoutes');

// Create express app
const app = express();

const PORT = process.env.PORT || 4001;

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '..', 'server', 'build')));

app.use('/', authRoutes);
app.use('/topicks', topicsRoutes);

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something is broken.');
});

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.');
});

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});
