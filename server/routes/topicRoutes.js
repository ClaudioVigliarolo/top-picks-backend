// Import express
const express = require('express')

// Import books-controller
const controllers = require('../controllers/controllers.js')

// Create router
const router = express.Router()

router.get('/categories/:lang', controllers.categoriesAll)
 
router.get('/topics/:lang', controllers.topicsAll)

router.get('/get_updates/:date/:lang', controllers.getUpdates)

router.get('/get_reports/:lang', controllers.reportsAll)

router.post('/add_category', controllers.categoryAdd)

router.post('/add_topic', controllers.topicAdd)

router.post('/add_questions', controllers.questionsAdd)

router.post('/add_report', controllers.reportAdd)

router.put('/update_question', controllers.questionUpdate)

router.delete('/delete_report', controllers.reportDelete)

router.delete('/delete_question', controllers.questionDelete)


// Export router
module.exports = router
