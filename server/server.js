// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet')
const { PORT } = require('../config/config');

// Import routes
const topicsRoutes = require('./routes/topicRoutes')

app.use(compression());

// Create express app
const app = express()
 
// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '..', 'server', 'build')));

app.use('/topicks', topicsRoutes)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

app.use(history(path.join(__dirname, '..', 'server', 'build', 'index.html')));


// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})


