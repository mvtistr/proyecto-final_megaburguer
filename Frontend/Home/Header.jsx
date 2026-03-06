import "@styles/global.css";
import "@styles/header.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Link } from "react-router-dom";
import { useContext } from "react";

import { Icons } from "@shared/icons";
import { CartContext } from "@context/CartContext";

import Logo from "@img/Logo-removebg.png";

function Header() {
  const { cartCount } = useContext(CartContext);

  return (
    <header className="header">
      <nav className="nav-bar">
        <img src={Logo} alt="Logo" className="logo" />
        <Link to="/">
          <h1 className="header-title title-font">Mega Burguer</h1>
        </Link>
        <div className="icons-header">
          <Link to="/profile" className="tooltip">
            <Icons.User size={30} className="icons" />
            <span className="tooltip-text">Perfil</span>
          </Link>

          <Link to="/cart" className="tooltip cart-icon">
            <Icons.Cart size={30} className="icons" />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
            <span className="tooltip-text">Pedido</span>
          </Link>

          <Link to="/menu" className="tooltip">
            <Icons.Menu size={30} className="icons" />
            <span className="tooltip-text">Menú</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;