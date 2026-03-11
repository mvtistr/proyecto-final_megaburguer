const express = require('express');
const router = express.Router();
const pool = require('./db/db.js');

router.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }  
});

router.get('/products/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/products', async (req, res) => {
    const { name, ingredients, price, image_url, category, stock } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO products (name, ingredients, price, image_url, category, stock) VALUES (?, ?, ?, ?, ?, ?)', [name, ingredients, price, image_url, category, stock]);
        res.status(201).json({ id: result.insertId, name, ingredients, price, image_url, category, stock });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/products/:id', async (req, res) => {
    const { name, ingredients, price, image_url, category, stock } = req.body;
    try {
        const [result] = await pool.query('UPDATE products SET name = ?, ingredients = ?, price = ?, image_url = ?, category = ?, stock = ? WHERE id = ?', [name, ingredients, price, image_url, category, stock, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ id: req.params.id, name, ingredients, price, image_url, category, stock });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ id: req.params.id, name, ingredients, price, image_url, category, stock });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;