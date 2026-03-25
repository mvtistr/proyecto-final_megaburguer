const jwt = require("jsonwebtoken");

const {
    loginModule,
    registerModule,
    deleteUserModule,
    updateUserModule,
} = require("../models/auth.model.js");

// LOGIN

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email y password son requeridos" });
        }
        const user = await loginModule(email, password);
        if (!user) {
            return res.status(401).json({ error: "Credenciales invalidas" });
        }
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.status(200).json({
            message: "Login exitoso",
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// REGISTER

const registerController = async (req, res) => {
    try {
        const { name, email, password, direction, role } = req.body;
        if (!name || !email || !password || !direction) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        const newUser = await registerModule(
            name,
            email,
            password,
            direction,
            role || "user",
        );
        res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: newUser,
        });
    } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: "Este correo electrónico ya está registrado" });
        }

       
        console.error("Error en registro:", error);
        res.status(500).json({ error: "Error al procesar el registro" });
    
    }
};

// UPDATE
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password, direction } = req.body;
        const updatedUser = await updateUserModule(id, name, password, direction);
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({
            message: "Usuario actualizado exitosamente",
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteUserModule(id);
        if (!deleted) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    loginController,
    registerController,
    updateUserController,
    deleteUserController,
};
