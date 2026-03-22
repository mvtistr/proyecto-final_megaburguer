# 🍔 Proyecto Final - Tienda Online MegaBurguer

Aplicación web fullstack para gestión de productos y pedidos, con autenticación de usuarios y panel de administración.

---

## 🚀 Tecnologías

* Frontend: React + Vite
* Backend: Node.js + Express
* Base de datos: (Render / externa)
* Deploy:

  * Frontend → Vercel
  * Backend → Render

---

## 📁 Estructura del Proyecto

```
frontend/
  src/
    pages/
    components/
    services/
    context/

backend/
  routes/
  controllers/
  middleware/
  models/
```

---

# 🌐 Rutas del Frontend

| Ruta           | Descripción             |
| -------------- | ----------------------- |
| `/`            | Página principal (Home) |
| `/menu`        | Listado de productos    |
| `/product/:id` | Detalle de producto     |
| `/cart`        | Carrito de compras      |
| `/login`       | Inicio de sesión        |
| `/register`    | Registro de usuario     |
| `/profile`     | Perfil del usuario      |
| `/admin`       | Panel de administración |

---

# 🔐 Rutas del Backend (API)

## 🧾 Auth

| Método | Ruta                 | Descripción       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/login`    | Iniciar sesión    |
| POST   | `/api/auth/register` | Registrar usuario |

---

## 🍔 Productos

| Método | Ruta                | Descripción                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/products`     | Obtener todos los productos |
| GET    | `/api/products/:id` | Obtener producto por ID     |
| POST   | `/api/products`     | Crear producto (admin)      |
| PUT    | `/api/products/:id` | Actualizar producto         |
| DELETE | `/api/products/:id` | Eliminar producto           |

---

## 🧾 Órdenes

| Método | Ruta                    | Descripción         |
| ------ | ----------------------- | ------------------- |
| GET    | `/api/orders/my-orders` | Órdenes del usuario |
| GET    | `/api/orders/:id`       | Detalle de orden    |
| POST   | `/api/orders`           | Crear orden         |
| PUT    | `/api/orders/:id`       | Actualizar orden    |
| DELETE | `/api/orders/:id`       | Eliminar orden      |

---

# 🔐 Autenticación

* Se utiliza JWT
* El token se guarda en `localStorage`
* Se envía automáticamente en headers mediante interceptors

---

# 📦 Funcionalidades

* Registro e inicio de sesión
* Visualización de productos
* Carrito de compras (persistente)
* Creación de pedidos
* Panel de administración (CRUD productos)
* Manejo de errores centralizado
* Notificaciones con toast

---

# 🌍 Deploy

## Frontend (Vercel)

👉 [https://proyecto-final-megaburguer-l2r1.vercel.app/]

## Backend (Render)

👉 [https://proyecto-final-megaburguer.onrender.com/api/products]

---

# 📌 Notas

* El frontend consume la API en producción (Render)
* El proyecto utiliza manejo de errores centralizado en `services`
* Las notificaciones UX se manejan con `react-hot-toast`

---

## 👨‍💻 Autores

* Roberto Calzadillo
* Daniel España
* Matías Sepúlveda

Proyecto desarrollado como parte de desafío final.
