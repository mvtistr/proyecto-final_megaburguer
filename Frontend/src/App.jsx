import { Routes, Route } from "react-router-dom";

import AdminView from "@pages/AdminView";
import Cart from "@pages/Cart.jsx";
import Home from "@pages/Home.jsx";
import Gallery from "@pages/Gallery.jsx";
import Login from "@pages/Login.jsx";
import Product from "@pages/Product.jsx";
import Profile from "@pages/Profile.jsx";
import Register from "@pages/Register.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

import Header from "@components/Header.jsx";
import Footer from "@components/Footer.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Gallery />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminView />} />

        {/* ruta 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;