// Import express
const { Router } = require("express");

// Import books-controller
const controllers = require("../controllers/authControllers");

const auth = require("../middlewares/auth");

// Create router
const router = Router();

router.post("/users/register", auth, controllers.register);
router.post("/users/login", controllers.login);
router.delete("/users/logout", auth, controllers.logout);

module.exports = router;
