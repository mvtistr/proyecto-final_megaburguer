const {Router} = require('express')



const {
    deleteUserController, 
    actualizarController, 
    loginController, 
    registerController} 
    = require('../controllers/auth.controller');

    const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/order.controller.js");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
     getProductsPaginacionController,

} = require('../controllers/product.controller.js');







const router = Router()



//rutas de usuarios
router.post('/users' , registerController)
router.put('/users/:id', actualizarController)
router.delete('/users/:id' , deleteUserController)
router.post('/login', loginController)



//rutas de ordenes



router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.post("/orders", createOrder);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);





//rutas de productos

router.get('/products', getProductsPaginacionController);

router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);


module.exports = router;