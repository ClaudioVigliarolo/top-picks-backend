// Import express
const { Router } = require('express');

// Import books-controller
const controllers = require('../controllers/authControllers');

const auth = require('../middlewares/auth');

// Create router
const router = Router();

router.get('/users/me', auth, controllers.user);
router.post('/users/register', auth, controllers.register);
router.post('/users/login', controllers.login);
router.post('/users/mail', auth, controllers.mail);
router.delete('/users/logout', auth, controllers.logout);

router.put('/users/update', auth, controllers.userUpdate);
router.delete('/users/delete', auth, controllers.userDelete);
router.get('/users/all', auth, controllers.usersAll);

module.exports = router;
