const pool = require('@db/db.js');

const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProduct = async (req, res) => {
    const { name, ingredients, price, image_url, category, is_featured, is_offer, stock } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO products (name, ingredients, price, image_url, category, is_featured, is_offer, stock)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, ingredients, price, image_url, category, is_featured, is_offer, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, price, image_url, category, is_featured, is_offer, stock } = req.body;
    try {
        const result = await pool.query(
            `UPDATE products SET name = $1, ingredients = $2, price = $3, image_url = $4, category = $5, is_featured = $6, is_offer = $7, stock = $8 WHERE id = $9 RETURNING *`,
            [name, ingredients, price, image_url, category, is_featured, is_offer, stock, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted', product: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting product' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};