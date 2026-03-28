import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icons } from "@shared/icons.js";
import { useAuth } from "@context/AuthContext";

import { toast } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/register_login.css";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  const [editing, setEditing] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    direction: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        direction: user.direction || ""
      });
    }

    setNombre(user.name || "");
    setEmail(user.email || "");
    setDireccion(user.address || "");
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await api.put(`/user/${user.id}`, form);
      toast.success("Perfil actualizado");
      setEditing(false);
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setForm({
      name: user.name,
      email: user.email,
      direction: user.direction
    });
  };

  const handleDelete = async () => {
    toast((t) => (
      <div>
        <p>¿Eliminar tu cuenta?</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            className="btn btn-danger btn-sm"
            onClick={async () => {
              try {
                setLoadingDelete(true);
                await api.delete(`/user/${user.id}`);
                toast.success("Cuenta eliminada");
                localStorage.removeItem("token");
                window.location.href = "/";
              } catch (error) {
                toast.error("Error al eliminar cuenta");
              }finally{
                setLoadingDelete(false);
              }
              toast.dismiss(t.id);
            }}
          >
            Si
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="register-container m-4 d-flex flex-column justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
          <Icons.User
            size={180}
            style={{ color: "rgb(255, 135, 50)" }}
          />

          <div className="d-md-flex justify-content-md-center m-3">
            <button
              className="m-3 px-4 btn"
              style={{
                backgroundColor: "rgb(255, 135, 50)",
                borderColor: "rgb(255, 135, 50)",
                color: "white",
              }}
              onClick={() => setEditing(true)}
            >
              Editar
            </button>

            <button
              className="m-3 px-4 btn"
              style={{
                backgroundColor: "rgb(255, 135, 50)",
                borderColor: "rgb(255, 135, 50)",
                color: "white",
              }}
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="col-md-8">
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
        </div>
      </div>
    </div>
  );
}

export default Profile;