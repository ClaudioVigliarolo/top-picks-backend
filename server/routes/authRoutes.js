// Import express
const express = require('express')

// Import books-controller
const controllers = require('../controllers/authControllers')

// Create router
const router = express.Router()

router.post('/login', controllers.login)
router.post('/logout', controllers.logout)



module.exports = router
