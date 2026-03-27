const isAdmin = (req, res, next) => {
    try{
        if(!req.user){
            return res.status(401).json({ error: "No autenticado" });
        }
        if(req.user.role !== "admin"){
            return res.status(403).json({ error: "Acceso denegado: solo admins" });
        }
        next();
    }catch(error){
        res.status(500).json({ error: "Error en autenticacion" });
    }
};

module.exports = { isAdmin };