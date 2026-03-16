import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Icons } from "@shared/icons.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/register_login.css";

function Profile() {
    const navigate = useNavigate();

    const [ email, setEmail]= useState('')
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }
        setNombre(user.name);
        setEmail(user.email);
        setDireccion(user.address);
    },[navigate]);
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    };
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
                        <button className="m-3  px-4 btn"
                        style={{
                            backgroundColor:'rgb(255, 135, 50)',
                            borderColor:'rgb(255, 135, 50)',
                            color: "white"
                        }}
                        onClick={logout}
                        >Cerrar sesión</button>
                    </div>
                </div>
                {/*===== datos =====*/}
                <div className="col-md-8">
                    <div className="m-3 form-floating">
                        <input 
                            className="form-control"
                            type="text" 
                            id="nombre" 
                            value={nombre}
                            onChange={(e)=>{setNombre(e.target.value)}}
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </div>

                <div className="m-3 form-floating">
                    <input
                        className="form-control"
                        type="email"
                        required 
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
            </div>
        </div>
    </div>
    );
}

export default Profile;