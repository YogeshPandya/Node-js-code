const express = require('express');
const router = express.Router();
const userController = require('../module/user/controllers/userController');

router.post('/create', userController.createUser);
router.get('/find', userController.getAllUsers);
router.post('/delete/:userId', userController.deleteUser);
router.post('/update/:userId', userController.updateUser);

module.exports = router;
