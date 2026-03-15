const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
     getProductsPaginacion,

} = require('@controllers/product.controller.js');

router.get('/products', getProductsPaginacion);

router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);



module.exports = router;