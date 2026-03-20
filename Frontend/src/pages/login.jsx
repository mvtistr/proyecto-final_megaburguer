import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";

import { loginUser } from "@services/auth.service.js";

import "@styles/home.css";
import "@styles/register_login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const entrar = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Debes completar todos los campos");
            return;
        }
        try {
            await loginUser({
                email,
                password
            });
            alert("👋 Bienvenido " + response.user.name + "!🍔");
            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            alert("Correo o contraseña incorrectos");
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div className=" login-container min-vh-100  d-flex flex-column justify-content-center align-items-center">
            <BsPersonFill size={60} className="" style={{ color: 'rgb(255, 135, 50)' }} />
            <h1 className="mt-5" style={{ color: 'rgb(255, 135, 50)' }} >Inicio de sesion</h1>
            <form onSubmit={entrar} className="formulario ">
                <div className="m-3 form-floating">
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <label htmlFor="email">Correo</label>
                </div>

                <div className="m-3 form-floating">

                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <label htmlFor="password">Contraseña</label>
                </div>

                <div className="row m-3" >
                    <a href="#" style={{ color: 'black' }}> Olvide contrasena</a>
                    <a href="#" style={{ color: 'black' }}> ¿No tienes cuenta?, ¡regístrate! </a>
                </div>
                <div className="text-center" >
                    <button
                        className="submit m-3 rounded-pill px-4 btn "
                        style={{
                            backgroundColor: 'rgb(255, 135, 50)',
                            borderColor: 'rgb(255, 135, 50)',
                            color: "white"
                        }}
                    >Iniciar sesion</button>
                </div>
            </form>
        </div>
    );
}

export default Login;