// Import express
const express = require('express')

// Import books-controller
const controllers = require('../controllers/controllers.js')

// Create router
const router = express.Router()

router.get('/categories/:lang', controllers.categoriesAll)
 
router.get('/topics/:lang', controllers.topicsAll)

router.post('/add_category', controllers.categoryAdd)

router.post('/add_topic', controllers.topicAdd)

router.post('/add_questions', controllers.questionsAdd)


// Export router
module.exports = router
