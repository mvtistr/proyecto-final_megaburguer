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
    const fields = [];
    const values = [];
    let index = 1;
    for(let key in product){
        fields.push(`${key} = $${index}`);
        values.push(product[key]);
        index++;
    }
    values.push(id);
    const query = `
    UPDATE products SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *
    `;
    const res = await pool.query(query, values);
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