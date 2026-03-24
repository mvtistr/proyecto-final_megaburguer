import "@styles/footer.css";
import { Link } from "react-router-dom";
import { Icons } from "@shared/icons.js";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">
                {/* MAPA */}
        <div className="footer-section footer-map">
          <h3>Encuéntranos</h3>
          <iframe
            src="https://www.google.com/maps?q=Santiago,Chile&output=embed"
            loading="lazy"
          ></iframe>
        </div>

        {/* NAVEGACIÓN */}
        <div className="footer-section footer-links">
          <h3>Navegación</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/pedido">Pedido</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Síguenos</h4>

          <div className="social-icons">

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.Instagram size={38} className="social-icon" style={{color:'withe'}} />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.Tiktok size={38} className="social-icon" style={{color:'withe'}} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.Facebook size={38} className="social-icon" style={{ color: 'withe' }} />
            </a>

          </div>

        </div>

      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Mega Burguer - Todos los derechos reservados
      </p>

    </footer>
  );
}

export default Footer;