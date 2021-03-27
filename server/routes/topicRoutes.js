const { Router } = require('express');

// Import books-controller
const controllers = require('../controllers/topicControllers.js');

const auth = require('../middlewares/auth');

// Create router
const router = Router();

router.get('/categories/:lang', auth, controllers.categoriesAll);

router.get('/topics/:lang', auth, controllers.topicsAll);

router.get('/updates/:date/:lang', controllers.getUpdates);

router.get('/reports/:lang', auth, controllers.reportsAll);

router.get('/questions/:from/:to/:lang', auth, controllers.questionsAll);

router.post('/add_category', auth, controllers.categoryAdd);

router.post('/add_topic', auth, controllers.topicAdd);

router.post('/add_questions', auth, controllers.questionsAdd);

router.post('/add_report', controllers.reportAdd);

router.put('/update_question', auth, controllers.questionUpdate);

router.put('/update_category', auth, controllers.categoryUpdate);

router.put('/update_topic', auth, controllers.topicUpdate);

router.delete('/delete_category', auth, controllers.categoryDelete);

router.delete('/delete_topic', auth, controllers.topicDelete);

router.delete('/delete_report', auth, controllers.reportDelete);

router.delete('/delete_question', auth, controllers.questionDelete);

// Export router
module.exports = router;
