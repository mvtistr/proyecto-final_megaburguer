const pool = require('../../db/db.js')

const getProducts = async () => {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    return result.rows;
};

const getProductsById = async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
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
    const result = await pool.query(
        `INSERT INTO products
        (name, ingredients, price, image_url, category, is_featured, is_offer, stock)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [name, ingredients, price, image_url, category, is_featured, is_offer, stock]
    );
    return result.rows[0];
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
    const result = await pool.query(
        `UPDATE products SET
        name = $1, ingredients = $2, price = $3, image_url = $4,
        category = $5, is_featured = $6, is_offer = $7, stock = $8
        WHERE id = $9 RETURNING *`,
        [name, ingredients, price, image_url, category, is_featured, is_offer, stock, id]
    );
    return result.rows[0];
};

const deleteProduct = async (id) => {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

module.exports = {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
};