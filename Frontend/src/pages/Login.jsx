import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";

import { loginUser } from "@services/auth.service.js";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

import "@styles/home.css";
import "@styles/register_login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const entrar = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Iniciando sesión...");
    if (!email || !password) {
      toast.error("Debes completar todos los campos");
      return;
    }
    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      toast.success(`👋 Bienvenido ${data.user.name}! 🍔`);
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate(from);
      }
    } catch (error) {
      toast.error("Correo o contraseña incorrectos");
      console.error("Error al iniciar sesión:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="login-container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <BsPersonFill size={60} style={{ color: "rgb(255, 135, 50)" }} />

      <h1 className="mt-5" style={{ color: "rgb(255, 135, 50)" }}>
        Inicio de sesión
      </h1>

      <form onSubmit={entrar} className="formulario">
        <div className="m-3 form-floating">
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
        </div>

        <div className="row m-3">
          <a href="#" style={{ color: "black" }}>
            Olvidé contraseña
          </a>

          <Link to="/register" style={{ color: "black" }}>
            ¿No tienes cuenta?, ¡regístrate!
          </Link>
        </div>

        <div className="text-center">
          <button
            className="submit m-3 rounded-pill px-4 btn"
            style={{
              backgroundColor: "rgb(255, 135, 50)",
              borderColor: "rgb(255, 135, 50)",
              color: "white",
            }}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
