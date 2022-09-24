const express = require('express');
const authentication = require('../middleware/Authentication');
const router = express.Router();
const UserController = require('../controllers/UserController');
const userController = new UserController();

router.use(authentication);
router.get('/:username', userController.getUserDetailByUsername);

module.exports = router;