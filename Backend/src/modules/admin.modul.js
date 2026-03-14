
const pool = require('../../db/db');



const agregarProductoModule = async (name, ingredients, price, image_url, is_featured, is_offer, category, stock) =>{
    const values = [name, ingredients, price, image_url, is_featured, is_offer, category, stock]
    const consulta = `insert into products (name, ingredients, price, image_url, is_featured, is_offer, category, stock) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *`
    const result = await pool.query(consulta, values)
    const productoAgregado = result.rows[0]
    return productoAgregado

}


const modificarProductoModule = async(name, ingredients, price, image_url, is_featured, is_offer, category, stock,id)=>{
    const values =[name, ingredients, price, image_url, is_featured, is_offer, category, stock,id]
    const consulta = `update products set name =$1, ingredients=$2, price= $3, imagen_url=$4, is_featured=$5, is_offer=$6, category = $7, stock=$8 where id=$9 returning *`
    const result= await pool.query(consulta, values)
    return result.rowCount


}

const deleteProductoModule = async (id )=>{
    const consulta =  `delete FROM product where id = $1`
    const values = [id]
    const result = await pool.query(consulta,values)
    return result.rowCount
    

}
 
module.exports = {modificarProductoModule, deleteProductoModule, agregarProductoModule}