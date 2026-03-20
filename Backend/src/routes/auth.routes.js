const express = require('express');
const router = express.Router();

const {
    loginController,
    registerController,
    deleteUserController,
    updateUserController
} = require('../controllers/auth.controller.js');

// AUTH
router.post('/register', registerController);
router.post('/login', loginController);

// USER
router.put('/user/:id', updateUserController);
router.delete('/user/:id', deleteUserController);

module.exports = router;