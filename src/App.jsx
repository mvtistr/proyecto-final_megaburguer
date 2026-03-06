import { Routes, Route } from "react-router-dom";

import Home from "@home/Home.jsx";
import Gallery from "@gallery/Gallery.jsx";
import Product from "@gallery/Product.jsx";
import Profile from "@users/Profile.jsx";
import Login from "@login/Login.jsx";
import Register from "@register/Register.jsx";
import Cart from "@cart/Cart.jsx";

import Header from "@home/Header.jsx";
import Footer from "@home/Footer.jsx";

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

        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;