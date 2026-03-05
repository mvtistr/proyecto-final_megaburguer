import { Link } from "react-router-dom";
import "@styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">
        <div className="footer-about">
          <h3 className="title-font">Mega Burguer</h3>
          <p>
            En Mega Burguer creemos que una hamburguesa no es solo comida,
            es una experiencia. Ingredientes frescos, sabores intensos y
            combinaciones únicas que hacen cada mordida inolvidable.
            ¡La calidad es nuestro ingrediente secreto!
          </p>
        </div>
        <div className="footer-links">
          <h4>Atajos</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><a href="#top">Volver arriba</a></li>
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/cart">Carrito</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Mega Burguer. Todos los derechos reservados.</p>
      </div>

    </footer>
  );
}

export default Footer;