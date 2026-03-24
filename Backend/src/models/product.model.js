const pool = require('../../db/db.js')

const getProducts = async () => {
    const res = await pool.query('SELECT * FROM products ORDER BY id ASC');
    return res.rows;
};

const getProductById = async (id) => {
    const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return res.rows[0];
};

const createProduct = async (product) => {
    const {
        name,
        ingredients,
        price,
        image_url,
        category,
        is_featured,
        is_offer,
        stock
    } = product;
    const res = await pool.query(
        `INSERT INTO products
        (name, ingredients, price, image_url, category, is_featured, is_offer, stock)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [name, ingredients, price, image_url, category, is_featured, is_offer, stock]
    );
    return res.rows[0];
};

const updateProduct = async (id, product) => {
    const {
        name,
        ingredients,
        price,
        image_url,
        category,
        is_featured,
        is_offer,
        stock
    } = product;
    const res = await pool.query(
        `UPDATE products SET
        name = $1, ingredients = $2, price = $3, image_url = $4,
        category = $5, is_featured = $6, is_offer = $7, stock = $8
        WHERE id = $9 RETURNING *`,
        [name, ingredients, price, image_url, category, is_featured, is_offer, stock, id]
    );
    return res.rows[0];
};

const deleteProduct = async (id) => {
    const res = await pool.query(
    'DELETE FROM products WHERE id = $1 RETURNING *',
    [id]
    );
    return res.rows[0];
};

const countFeaturedProducts = async () => {
    const res = await pool.query(
        'SELECT COUNT(*) FROM products WHERE is_featured = true'
    );
    return parseInt(res.rows[0].count);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    countFeaturedProducts
};