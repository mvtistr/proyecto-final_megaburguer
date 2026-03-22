import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import { registerUser } from "@services/auth.service.js";

import "@styles/register_login.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Register() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const subir = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creando cuenta ...");
    if (
      !email ||
      !nombre ||
      !direccion ||
      !telefono ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Debes llenar todos los datos");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas deben coincidir");
      return;
    }

    try {
      await registerUser({
        name: nombre,
        email,
        password,
        direction: direccion,
        phone: telefono,
      });
      toast.success("Registro exitoso 🍔");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Error al registrarse");
      console.error("Error al registrarse:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="register-container m-5 d-flex flex-column justify-content-center align-items-center">
      <h1 style={{ color: "rgb(255, 135, 50)" }}>Registrarse</h1>

      <form onSubmit={subir} className="formulario">
        <div className="row">
          <div className="col-md-6">
            <div className="m-3 form-floating">
              <input
                className="form-control"
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <label htmlFor="nombre">Nombre</label>
            </div>

            <div className="m-3 form-floating">
              <input
                className="form-control"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="m-3 form-floating">
              <input
                className="form-control"
                type="text"
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
              <label htmlFor="direccion">Dirección</label>
            </div>

            <div className="m-3 form-floating">
              <input
                className="form-control"
                type="text"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <label htmlFor="telefono">Teléfono</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="m-3 form-floating">
              <input
                className="form-control"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>
            </div>

            <div className="m-3 form-floating">
              <input
                className="form-control"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            </div>
          </div>
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
            Registrarse
          </button>
        </div>

        <div className="text-center">
          <Link to="/login" style={{ color: "black" }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;