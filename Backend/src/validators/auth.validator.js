const validateRegister = (req, res, next) => {
    const { name, email, password, direction } = req.body;
    if(!name || name.trim().length < 2){
        return res.status(400).json({
            error: "El nombre es obligatorio (minimo 2 caracteres)"
        });
    }
    if(!email || !email.includes("@")){
        return res.status(400).json({
            error: "Email invalido"
        });
    }
    if(!password || password.length < 6){
        return res.status(400).json({
            error: "La contraseña debe tener al menos 6 caracteres"
        });
    }
    if(!direction || direction.trim().length < 5){
        return res.status(400).json({
            error: "La direccion es obligatoria"
        });
    }
    next();
};

const validateLogin = (user) => {
    const { email, password } = req.body;
    if(!email || !email.includes("@")){
        return res.status(400).json({
            error: "Email invalido"
        });
    }
    if(!password){
        return res.status(400).json({
            error: "La contraseña es obligatoria"
        });
    }
    next();
};

const validateUpdateUser = (req, res, next) => {
    const { name, password, direction } = req.body;
    if(name && name.trim().length < 2){
        return res.status(400).json({
            error: "El nombre debe tener al menos 2 caracteres"
        });
    }
    if(password && password.length < 6){
        return res.status(400).json({
            error: "La contraseña debe tener al menos 6 caracteres"
        });
    }
    if(direction && direction.trim().length < 5){
        return res.status(400).json({
            error: "Direccoin invalida"
        });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateUpdateUser
};