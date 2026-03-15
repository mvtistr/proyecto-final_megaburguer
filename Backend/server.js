const express = require('express');
const cors = require('cors');
const path = require('path');

/* rutas */
const authRoutes = require('./src/routes/auth.routes.js');
const productRoutes = require('./src/routes/product.routes.js');
const orderRoutes = require('./src/routes/order.routes.js');

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* api routes */
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

/* frontend */
app.use(
    express.static(
        path.join(__dirname, '..', "frontend", "dist", "index.html")
    )
);

/* server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
