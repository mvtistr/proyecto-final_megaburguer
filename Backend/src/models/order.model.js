const pool = require('../../db/db.js');

const getOrders = async () => {
    const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    return result.rows;
};

const getOrderById = async (id) => {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
};

const createOrder = async ({user_id, cart, total_price }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const orderResult = await client.query(
            `INSERT INTO orders (user_id, total_price)
            VALUES ($1, $2)
            RETURNING *`,
            [user_id, total_price]
        );
        const order = orderResult.rows[0];
        for(let item of cart){
            await client.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES ($1, $2, $3, $4)`,
                [order.id, item.product_id, item.quantity, item.price]
            );
        }
        await client.query('COMMIT');
        return order;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally {
        client.release();
    }
};

const updateOrder = async (id, status) => {
    const result = await pool.query(
        'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
    );
    return result.rows[0];
};

const deleteOrder = async (id) => {
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

const getOrderDetails = async (id) => {
    const result = await pool.query(
        `SELECT d.*, p.name
        FROM details d
        JOIN products p ON p.id = d.product_id
        WHERE d.order_id = $1`,
        [id]
    );
    return result.rows;
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderDetails
};