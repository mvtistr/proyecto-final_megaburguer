const {modificarProductoModule, deleteProductoModule, agregarProductoModule} = require('../models/admin.modul.js')


const modificarProductoController = async (req,res)=>{
    try {
        const {id} = req.params
        const {name, ingredients, price, image_url, is_featured, is_offer, category, stock} = req.body
        await modificarProductoModule(name, ingredients, price, image_url, is_featured, is_offer, category, stock, id)
        res.send("Modificado")

        
    } catch (err) {
        res.status(500).json({error:error.messae})
        
    }
}
const deleteProductController = async ( req,res ) =>{
    try {
        const {id} = req.params
    await deleteProductoModule(id)
    res.send("Producto Eliminado")
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}

const agregarProductoController = async (req,res)=>{
    try {
        
        const {name, ingredients, price, image_url, is_featured, is_offer, category, stock} = req.body
        await agregarProductoModule(name, ingredients, price, image_url, is_featured, is_offer, category, stock)
        res.send("Agregado")

        
    } catch (err) {
        res.status(500).json({error:error.messae})
        
    }
}

module.exports = {agregarProductoController, deleteProductController, modificarProductoController} 