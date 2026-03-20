const {Router} = require('express')
const router = Router();

// imports
const authRoutes = require('./auth.routes.js');
const productRoutes = require('./product.routes.js');
const orderRoutes = require('./order.routes.js');

// usarlas
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;