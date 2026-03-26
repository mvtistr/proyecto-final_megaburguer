import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdminView from "@pages/AdminView";
import Cart from "@pages/Cart.jsx";
import Home from "@pages/Home.jsx";
import Gallery from "@pages/Gallery.jsx";
import Login from "@pages/Login.jsx";
import Product from "@pages/Product.jsx";
import Profile from "@pages/Profile.jsx";
import Register from "@pages/Register.jsx";
import CreateProduct from "./pages/CreateProduct";

import ProtectedRoute from "./components/ProtectedRoute";

import Header from "@components/Header.jsx";
import Footer from "@components/Footer.jsx";

function App() {
  return (
    <>
    <Toaster
    position="top-right"
    toastOptions={{
      style: {
        fontSize: "14px",
      },
      success: {
        duration: 6000,
      },
      error: {
        duration: 5000
      },
    }}
    />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Gallery />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/crear" element={<CreateProduct />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminView />
            </ProtectedRoute>
          }
        />

        

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;