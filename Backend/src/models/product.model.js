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
        description,
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
        (name, description, ingredients, price, image_url, category, is_featured, is_offer, stock)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [name, description, ingredients, price, image_url, category, is_featured, is_offer, stock]
    );
    return res.rows[0];
};

const updateProduct = async (id, product) => {
    const {
        name,
        description,
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
        name = $1, description = $2, ingredients = $3, price = $4, image_url = $5,
        category = $6, is_featured = $7, is_offer = $8, stock = $9
        WHERE id = $10 RETURNING *`,
        [name, description, ingredients, price, image_url, category, is_featured, is_offer, stock, id]
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