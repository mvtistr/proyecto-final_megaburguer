const jwt = require("jsonwebtoken")




const {loginModule , deleteUserModule, registerModule , actualizarUserModule} = require('../modules/auth.model.js')




const loginController = async(req, res) =>{
    try{
        const {email, password}= req.body
        const token = await loginModule(email,password);
        console.log("Token recibido", token)
        
        
        res.status(200).json({token})

    }catch(err){
        res.status(500).json({error:error.message})

    }
}


const registerController = async (req,res)=>{
    try {
        const {name,email, password, direction, role} = req.body
        await registerModule(name, email, password, direction, role)
        res.send("Te has  registrado")

        
    } catch (err) {
        res.status(500).json({error:error.messae})
        
    }
}


const actualizarController = async (req,res) =>{
    const {id} = req.params
    const {name, password, direction} = req.body
    try {
         await actualizarUserModule(id, name, password, direction)
        res.send("Actualizado")

      
        
        
    } catch (err) {
        res.status(500).json({eror:error.message})
        
    }
}



const deleteUserController = async ( req,res ) =>{
    try {
        const {id} = req.params
    await deleteUserModule(id)
    res.send("Cuenta Eliminada")
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}


module.exports = {deleteUserController, actualizarController, loginController, registerController}