import Header from "../Home/Header.jsx";
import { useState, useEffect } from "react";
import { Icons } from "@shared/icons.js";

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/register_login.css";




function Profile() {
    
    const [ email, setEmail]= useState('')
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')

    useEffect(() =>{
        const fetchData =  async() =>{
            try {
                const id=3
                const res = await fetch(`https://69aa41aee051e9456fa0d454.mockapi.io/prueba/users/${id}`)
                const data = await res.json();
                setNombre(data.name)
        setEmail(data.correo)
        setDireccion(data.direccion)
        setTelefono(data.telefono)



                

            }catch (error) {
            console.error("Error al obtener los datos:", error);
        }
        }

        






fetchData()
    },[]);





    
    return (



       
       <div className="register-container  m-4  d-flex flex-column justify-content-center align-items-center">

        <div className="row ">

            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center ">
             <Icons.User size={180} className="" style={{color:'rgb(255, 135, 50)'}}  />
             <div className=" d-md-flex justify-content-md-center m-3   ">
                <button className=" m-3  px-4 btn "
            style={{
                backgroundColor:'rgb(255, 135, 50)',
                borderColor:'rgb(255, 135, 50)',
                color: "white"
            }}
            > Editar </button>
            <button className=" m-3  px-4 btn "
            style={{
                backgroundColor:'rgb(255, 135, 50)',
                borderColor:'rgb(255, 135, 50)',
                color: "white"
            }}
            >Eliminar</button>


             </div>
             </div>


             <div className="col-md-8">
                <div className="m-3 form-floating">
                <input 
                className="form-control"
                type="text" 
                id="nombre" 
                placeholder=""
                value={nombre}
                onChange={(e)=>{setNombre(e.target.value)}}
                />
                  <label htmlFor="nombre">Nombre</label>
                </div>
                 <div className="m-3 form-floating">
                    
                <input
                className="form-control"
                 type="text" 
                 id="email"
                  value={email} 
                  onChange={(e)=>{setEmail(e.target.value)}}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                 <div className="m-3 form-floating">
                 
                <input
                className="form-control"
                 type="text" 
                 id="direccion" 
                 value={direccion}
                 onChange={(e)=>{setDireccion(e.target.value)}}
                  />
                     <label htmlFor="direccion">Direccion</label>
                  </div>
               
                 <div className="m-3 form-floating">
                   
                <input
                className="form-control"
                 type="tel" 
                 id="telefono" 
                 value={telefono}
                 onChange={(e)=>{setTelefono(e.target.value)}} 
                 />
                  <label htmlFor="telefono">Telefono</label>
                  </div>
                   </div>
           
            

        </div>

       </div>
       
    );
}

export default Profile;