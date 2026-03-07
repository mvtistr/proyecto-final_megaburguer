import { Routes, Route } from "react-router-dom";
import Home from "@home/Home.jsx";
import Menu from "@gallery/Gallery.jsx";
import Profile from "@users/Profile.jsx";
import Login from "@login/login"
import Register from "@register/Register.jsx"
import Pedido from "@cart/Cart";
import Header from "@home/Header.jsx";
import Footer from "@home/Footer.jsx";
import AdminView from "../Frontend/admin/AdminView"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Pedido />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/register" element ={<Register />}/>
        <Route path= "/login" element = {<Login />} /> 
        <Route path= "/admin" element = {<AdminView />} /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;