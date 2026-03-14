const {Router} = require('express')


const {agregarProductoController, deleteProductController, modificarProductoController} = require('../controllers/admin.controller.js')

const router = Router()

router.post('/products' , agregarProductoController)
router.put('/product/:id', modificarProductoController)
router.delete('/product/:id' , deleteProductController)

