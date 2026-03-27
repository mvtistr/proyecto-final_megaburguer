const pool = require('../../db/db.js');

const getUserByEmail = async (email) => {
    const res = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return res.rows[0];
};

const getUserById = async (id) => {
    const res = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );
    return res.rows[0];
};

const createUser = async ({ name, email, password, direction, role = 'user' }) => {
    const res = await pool.query(
        `INSERT INTO users (name, email, password, direction, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, direction, role`,
        [name, email, password, direction, role]
    );
    return res.rows[0];
};

const updateUser = async (id, { name, password, direction }) => {
    const res = await pool.query(
        `UPDATE users
        SET name = $1,
            password = COALESCE($2, password),
            direction = $3
        WHERE id = $4
        RETURNING id, name, email, direction, role`,
        [name, password || null, direction, id]
    );
    return res.rows[0];
};

const deleteUser = async (id) => {
    const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return res.rows[0];
};

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};