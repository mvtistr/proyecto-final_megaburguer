const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth.middleware.js');

const {
  loginController,
  registerController,
  deleteUserController,
  updateUserController
} = require('../controllers/auth.controller.js');

const { validateLogin, validateRegister, validateUpdateUser } = require('../validators/auth.validator.js');

router.post('/register', validateRegister, registerController);
router.post('/login', validateLogin, loginController);

router.put('/user/:id', verifyToken, validateUpdateUser, updateUserController);
router.delete('/user/:id', verifyToken, deleteUserController);

module.exports = router;