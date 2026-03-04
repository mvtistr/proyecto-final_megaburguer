import { useState } from "react";
import { Icons } from "@shared/icons.js";
import "@styles/home.css";

import 'bootstrap-icons/font/bootstrap-icons.css'




function Register() {

    const [password, setPassword]= useState('')
    const [ email, setEmail]= useState('')
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function subir(e){
    e.preventDefault()

    if (!email || !nombre || !direccion || !telefono||  !password || !confirmPassword ){
        alert('llenar todos los datos')
        return
    }
    else if (password === confirmPassword){
        alert('Felicidades te has registrado correctamente')
    }
    else if (password !== confirmPassword){
        alert('Las contrasenas deben coincidir')
    }


}




  return (
    <div className="register-container  min-vh-100  d-flex flex-column justify-content-center align-items-center">
        <h1 style={{color:'rgb(255, 135, 50)'}}>Registrarse</h1>
        <form action="" className="formulario">

            
            <div className="input-containers">
                <label htmlFor="nombre">Nombre</label>
                <input 
                type="text" 
                id="nombre" 
                
                value={nombre}
                onChange={(e)=>{setNombre(e.target.value)}}
                />
                 <label htmlFor="email">Email</label>
                <input
                 type="text" 
                 id="email"
                  value={email} 
                  onChange={(e)=>{setEmail(e.target.value)}}
                  />
                 <label htmlFor="direccion">Direccion</label>
                <input
                 type="text" 
                 id="direccion" 
                 value={direccion}
                 onChange={(e)=>{setDireccion(e.target.value)}}
                  />
                 <label htmlFor="telefono">Telefono</label>
                <input
                 type="telefono" 
                 id="telefono" 
                 value={telefono}
                 onChange={(e)=>{setTelefono(e.target.value)}} 
                 />
                 <label htmlFor="password">Contrasena</label>
                <input 
                
                type="password" 
                id="password"
                 value={password}
                 onChange={(e)=>{setPassword(e.target.value)}}
                 />
                 <label htmlFor="confirmPassword">Confirmar Contrasena</label>
                <input 
                type="password"
                 id="confirmPassword" 
                 value={confirmPassword}
                 onChange={(e)=>{setConfirmPassword(e.target.value)}}
                 placeholder="" />

                
            </div>
            
            
            <button className="submit">Registrarse</button>
        </form>


    </div>
  );
}

export default Register;