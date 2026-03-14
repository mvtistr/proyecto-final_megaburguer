const {Router} = require('express')




const {deleteUserController, actualizarController, loginController, registerController} = require('../controllers/auth.controller')


const router = Router()

router.post('/users' , registerController)
router.put('/users/:id', actualizarController)
router.delete('/users/:id' , deleteUserController)
router.post('/login', loginController)
