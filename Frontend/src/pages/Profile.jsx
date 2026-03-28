import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icons } from "@shared/icons.js";
import { useAuth } from "@context/AuthContext";

import { toast } from "react-hot-toast";

import api from "../services/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/register_login.css";

const getFormFromUser = (userData) => ({
  name: userData?.name || "",
  email: userData?.email || "",
  direction: userData?.direction || "",
  newPassword: ""
});

function Profile() {
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuth();
  const userId = user?.id;

  const [editing, setEditing] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(getFormFromUser());

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setForm(getFormFromUser(user));
  }, [user, navigate]);

  useEffect(() => {
    if (!userId) return;

    let ignore = false;

    const loadProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        if (ignore) return;

        const profileUser = {
          id: res.data?.id ?? user?.id,
          name: res.data?.name ?? user?.name ?? "",
          email: res.data?.email ?? user?.email ?? "",
          direction: res.data?.direction ?? user?.direction ?? "",
          role: res.data?.role ?? user?.role
        };

        setUser((currentUser) => {
          if (
            currentUser?.id === profileUser.id &&
            currentUser?.name === profileUser.name &&
            currentUser?.email === profileUser.email &&
            currentUser?.direction === profileUser.direction &&
            currentUser?.role === profileUser.role
          ) {
            return currentUser;
          }

          return profileUser;
        });

        setForm((currentForm) => ({
          ...getFormFromUser(profileUser),
          newPassword: currentForm.newPassword
        }));
      } catch {
        // Si falla la sincronizacion, mantenemos lo que ya hay en sesion.
      }
    };

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [setUser, user?.direction, user?.email, user?.id, user?.name, user?.role, userId]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    if (!user) return;

    setForm(getFormFromUser(user));
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const cleanData = {
        name: form.name.trim(),
        direction: form.direction.trim()
      };
      const nextPassword = form.newPassword.trim();

      if (nextPassword) {
        cleanData.password = nextPassword;
      }

      const res = await api.put(`/auth/user/${user.id}`, cleanData);
      const updatedUser = {
        id: res.data?.id ?? user?.id,
        name: res.data?.name ?? cleanData.name,
        email: res.data?.email ?? user?.email ?? form.email,
        direction: res.data?.direction ?? cleanData.direction,
        role: res.data?.role ?? user?.role
      };

      setForm(getFormFromUser(updatedUser));
      setUser(updatedUser);
      toast.success("Perfil actualizado");
      setEditing(false);
    } catch {
      toast.error("Error al actualizar");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setForm(getFormFromUser(user));
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
                await api.delete(`/auth/user/${user.id}`);
                toast.success("Cuenta eliminada");
                localStorage.removeItem("token");
                window.location.href = "/";
              } catch {
                toast.error("Error al eliminar cuenta");
              } finally {
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
            {!editing && (
              <button
                type="button"
                className="m-3 px-4 btn"
                style={{
                  backgroundColor: "rgb(255, 135, 50)",
                  borderColor: "rgb(255, 135, 50)",
                  color: "white",
                }}
                onClick={handleEdit}
              >
                Editar
              </button>
            )}

            <button
              type="button"
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
          {editing ? (
            <>
              <div className="m-3 form-floating">
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <label>Nombre</label>
              </div>
              <div className="m-3 form-floating">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  disabled
                />
                <label>Email</label>
              </div>
              <div className="m-3 form-floating">
                <input
                  className="form-control"
                  type="text"
                  name="direction"
                  id="direction"
                  value={form.direction}
                  onChange={handleChange}
                />
                <label>Direccion</label>
              </div>
              <div className="m-3 form-floating">
                <input
                  className="form-control"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={form.newPassword}
                  autoComplete="new-password"
                  placeholder="Nueva contraseña"
                  onChange={handleChange}
                />
                <label>Nueva contraseña</label>
              </div>
              <div className="d-flex gap-2 m-3">
                <button type="button" className="btn btn-success" onClick={handleSave} disabled={saving}>
                  {saving ? "Guardando..." : "Guardar"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-auto"
                  onClick={handleDelete}
                  disabled={loadingDelete}
                >
                  {loadingDelete ? "Eliminando..." : "Eliminar cuenta"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="m-3">
                <p><strong>Nombre:</strong> {form.name}</p>
              </div>
              <div className="m-3">
                <p><strong>Email</strong> {form.email}</p>
              </div>
              <div className="m-3">
                <p><strong>Direccion</strong> {form.direction}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
