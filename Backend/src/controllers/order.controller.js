const pool = require('@db/db.js');

const getOrders = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                o.id,
                u.name AS client,
                o.total_price,
                o.status,
                o.order_date
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            ORDER BY o.order_date DESC
            `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting orders' });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting orders' });
    }
};

const getOrderDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT
                p.name,
                d.quantity,
                d.price
            FROM details d
            JOIN products p 
            ON d.product_id = p.id
            WHERE d.order_id = $1
        `, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting order details' });
    }
};

const createOrder = async (req, res) => {
    const { user_id, items } = req.body;
    try {
        await pool.query('BEGIN');
        const total_price = items.reduce(
            (acc, item) => acc + item.price * item.quantity, 
            0
        );

        const orderResult = await pool.query(
            `INSERT INTO orders (user_id, total_price, status)
            VALUES ($1, $2, $3)
            RETURNING id`,
            [user_id, total_price, "finalizado"]
        );

        const orderId = orderResult.rows[0].id;
        for (const item of items) {
            await pool.query(
                `INSERT INTO details (order_id, product_id, quantity, price)
                VALUES ($1, $2, $3, $4)`,
                [orderId, item.id, item.quantity, item.price]
            );
        }
        await pool.query('COMMIT');

        res.status(201).json({
            message: 'Order created',
            order_id: orderId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating order' });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { user_id, total_price, status } = req.body;
    try {
        const result = await pool.query(
            `UPDATE orders SET user_id = $1, total_price = $2, status = $3 WHERE id = $4 RETURNING *`,
            [user_id, total_price, status, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating order' });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted', order: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting order' });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    getOrderDetails,
    createOrder,
    updateOrder,
    deleteOrder
};