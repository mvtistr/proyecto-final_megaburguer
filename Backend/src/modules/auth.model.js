const express = require('express');
const bcrypt = require('bcryptjs')
const pool = require('../../db/db');






const registerModule = async (name, email, password, direction, role = 'user') =>{
    const passwordSegura =bcrypt.hashSync(password,10)
    password = passwordSegura
    const values = [name, email, passwordSegura, direction, role]
    const consulta = `insert into users (name, email, password, direction, role) values ($1,$2,$3,$4, $5) returning *`
    const result = await pool.query(consulta, values)
    const usuarioRegistrado = result.rows[0]
    return usuarioRegistrado

}


const deleteUserModule = async (id )=>{
    const consulta =  `delete FROM users where id = $1`
    const values = [id]
    const result = await pool.query(consulta,values)
    return result.rowCount
    

}


const actualizarUserModule = async(id, name, password, direction)=>{
    const passwordSegura = bcrypt.hashSync(password, 10);
    const values = [ name, passwordSegura,direction, id]

    const consulta = `update users set name =$1, password = $2, direction =$3 where id= $4 returning *`
    const result = await pool.query(consulta, values)
    return result.rowCount

}





const loginModule = async (email, password) =>{
    const values = [email]
    const consulta = `select * from users where email=$1`
    const result = await pool.query(consulta, values )
    const usuario = result.rows[0]
    const rowCount = result.rowCount


    if (rowCount===0){
        throw {code:401, message :"email no encontrado"};
    }

    const { password:passwordSegura}= usuario
    const passwordCorrecta = bcrypt.compareSync(password, passwordSegura)

    if(!passwordCorrecta) {
        throw {code: 401, message: "Datos incorrectos"}
    }

    const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:'1h'})
    return token;



}



module.exports = {loginModule , deleteUserModule, registerModule , actualizarUserModule} 