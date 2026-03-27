const { getUserByEmail, getUserById, createUser, updateUser, deleteUser } = require("../models/auth.model.js");
const { validateRegister, validateLogin } = require("../validators/auth.validator.js");
const { hashPassword, comparePassword } = require('../utils/hash.js');
const { generateToken } = require('../utils/jwt.js');
const { hash } = require("bcryptjs");

// LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if(!user){
            return res.status(401).json({
                error: "Credenciales invalidas"
            });
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                error: "Credenciales invalidas"
            });
        }
        const token = generateToken(user);
        return res.status(200).json({
            message: "Login exitoso",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error("ERROR LOGIN:", error);
        return res.status(500).json({
            error: "Error al iniciar sesion"
        });
    }
};

// REGISTER
const registerController = async (req, res) => {
    try {
        const { name, email, password, direction } = req.body;
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({
                error: "El correo ya esta registrado"
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await createUser({
            name,
            email,
            password: hashedPassword,
            direction
        });
        const token = generateToken(user);
        return res.status(201).json({
            message: "Usuario registrado",
            user,
            token
        });
    }catch(error){
        console.error("ERROR REGISTER:", error);
        return res.status(500).json({
            error: "Error al registrar usuario"
        });
    }
};

const getProfile = async (req, res) => {
    try{
        const user = await getUserById(req.user.id);
        if(!user){
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            direction: user.direction,
            role: user.role
        });
    }catch(error){
        return res.status(500).json({
            error: "Error obteniendo usuario"
        });
    }
};

// UPDATE
const updateUserController = async (req, res) => {
    try {
        const { name, password, direction } = req.body;
        let hashedPassword = null;
        if(password){
            hashedPassword = await hashPassword(password);
        }
        const updatedUser = await updateUser(req.user.id, {
            name,
            password: hashedPassword,
            direction
        });
        return res.status(200).json({
            message: "Usuario actualizado exitosamente",
            user: updatedUser,
        });
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        return res.status(500).json({ error: "Error actualizando usuario" });
    }
};

// DELETE
const deleteUserController = async (req, res) => {
    try {
        await deleteUser(req.user.id);
        return res.json({ message: "Usuario eliminado" });
    } catch (error) {
        console.error("DELETE ERROR:", error);
        return res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

module.exports = {
    loginController,
    registerController,
    getProfile,
    updateUserController,
    deleteUserController,
};
