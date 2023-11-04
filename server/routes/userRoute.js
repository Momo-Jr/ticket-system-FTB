const express = require('express');
const { userLogin, userRegister , getMe } = require('../controller/userController');
const { protect } = require('../middleware/authorizationMiddleware');
const router = express.Router();

router.post('/', userRegister);
router.post('/login', userLogin);
router.get('/me',protect, getMe);


module.exports = router;
