const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authCheck');

const userController = require('../controller/userController')

router.post('/signup', userController.user_register);

router.post('/login', userController.user_login);

router.delete('/:userId', checkAuth,userController.user_delete);

router.patch('/:userId', checkAuth,userController.user_update);

router.get('/:userEmail', checkAuth,userController.user_detail);

router.get('/', checkAuth, userController.user_all);

module.exports = router;