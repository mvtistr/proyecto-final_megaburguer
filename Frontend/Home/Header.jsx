import "@styles/global.css";
import "@styles/header.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from "react-router-dom";
import { Icons } from "@shared/icons";

function Header() {
    return (
        <header className="header">
            <nav className="nav-bar">
                <img src="../../src/assets/img/Logo-removebg.png" alt="Logo" className="logo" />
                <Link to="/">
                    <h1 className="header-title title-font">Mega Burguer</h1>
                </Link>
                <div className="icons-header">
                    <Link to="/profile">
                        <Icons.User size={30} className="icons" />
                    </Link>

                    <Link to="/cart">
                        <Icons.Cart size={30} className="icons" />
                    </Link>

                    <Link to="/menu">
                        <Icons.Menu size={30} className="icons" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;