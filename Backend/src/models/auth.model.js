const pool = require('../../db/db.js');
const bcrypt = require('bcryptjs')

const registerModule = async (name, email, password, direction, role = 'user') => {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
        const error = new Error("El email ya está registrado");
        error.code = "USER_EXISTS";
        throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await pool.query(
        `INSERT INTO users (name, email, password, direction, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, direction, role`,
        [name, email, hashedPassword, direction, role]
    );
    return res.rows[0];
};

const loginModule = async (email, password) => {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (res.rows.length === 0) return null;
    const user = res.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};

const updateUserModule = async (id, name, email, password, direction) => {
    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }
    const res = await pool.query(
        `UPDATE users
        SET name = $1,
            password = COALESCE($2, password),
            direction = $3
        WHERE id = $4
        RETURNING id, name, email, direction, role`,
        [name, hashedPassword, direction, id]
    );
    return res.rows[0];
};

const deleteUserModule = async (id) => {
    const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return res.rows[0];
};

module.exports = {
    registerModule,
    loginModule,
    updateUserModule,
    deleteUserModule
};