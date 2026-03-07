import "@styles/global.css";
import "@styles/header.css";

import { Link } from "react-router-dom";
import { Icons } from "@shared/icons";

import Logo from "@img/Logo-removebg.png";

function Header() {
    return (
        <header className="header">
            <nav className="nav-bar">

              <div className="header-logo">
                <img src={Logo} alt="Logo" className="logo" />
              </div>

              <div className="header-title-container">
                <Link to="/">
                    <h1 className="header-title title-font">Mega Burguer</h1>
                </Link>
              </div>

                <div className="icons-header">
                    <Link to="/profile">
                        <Icons.User size={50} className="icons" />
                    </Link>

                    <Link to="/cart">
                        <Icons.Cart size={50} className="icons" />
                    </Link>

                    <Link to="/menu">
                        <Icons.Menu size={50} className="icons" />
                    </Link>
                </div>

            </nav>
        </header>
    );
}

export default Header;