const express = require('express');
const router = express.Router();
const pool = require('./db/db.js');

router.get('/orders', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/orders/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/orders', async (req, res) => {
    const { user_id, total_price, status } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)', [user_id, total_price, status]);
        res.status(201).json({ id: result.insertId, user_id, total_price, status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/orders/:id', async (req, res) => {
    const { user_id, total_price, status } = req.body;
    try {
        const [result] = await pool.query('UPDATE orders SET user_id = ?, total_price = ?, status = ? WHERE id = ?', [user_id, total_price, status, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ id: req.params.id, user_id, total_price, status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/orders/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ id: req.params.id, user_id, total_price, status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;