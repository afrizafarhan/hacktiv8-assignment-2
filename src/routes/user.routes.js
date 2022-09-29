const express = require('express');
const authentication = require('../middleware/Authentication');
const router = express.Router();
const UserController = require('../controllers/UserController');
const Authorization = require('../middleware/authorization');
const userController = new UserController();

router.use(authentication);
router.get('/:id', Authorization.userAuthorization, userController.getUserDetailById);

module.exports = router;