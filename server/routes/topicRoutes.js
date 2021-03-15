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

router.get('/get_questions/:lang', controllers.questionsAll)

router.post('/add_category', controllers.categoryAdd)

router.post('/add_topic', controllers.topicAdd)

router.post('/add_questions', controllers.questionsAdd)

router.post('/add_report', controllers.reportAdd)

router.put('/update_question', controllers.questionUpdate)

router.put('/update_category', controllers.categoryUpdate)

router.put('/update_topic', controllers.topicUpdate)

router.delete('/delete_category', controllers.categoryDelete)

router.delete('/delete_topic', controllers.topicDelete)


router.delete('/delete_report', controllers.reportDelete)

router.delete('/delete_question', controllers.questionDelete)




// Export router
module.exports = router
