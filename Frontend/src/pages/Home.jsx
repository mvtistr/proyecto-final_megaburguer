import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icons } from "@shared/icons.js"
import { getProducts } from "../services/product.service";

import "@styles/home.css";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured);
  const offers = products.filter(p => p.isOffer).slice(0, 4);

  const nextSlide = () => {
    setCurrent(prev =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent(prev =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  if (featuredProducts.length === 0) {
    return <p>No hay productos destacados</p>;
  }

  const featured = featuredProducts[current];

  return (
    <div className="home-container">

      {/* ====== BANNER DESTACADO ====== */}
      <section className="hero-section">
        <button className="arrow left" onClick={prevSlide}>
          <Icons.ArrowLeft size={28} />
        </button>
        <img
          src={featured.image_url}
          alt={featured.name}
          className="hero-image"
          onClick={() => navigate(`/product/${featured.id}`)}
          style={{ cursor: "pointer", "height": "400px", "width": "500px" }}
        />
        <button className="arrow right" onClick={nextSlide}>
          <Icons.ArrowRight size={28} />
        </button>
        <div className="hero-content">
          <h2 className="title-font">{featured.name}</h2>
          <button
            className="shop-btn"
            onClick={() => navigate(`/product/${featured.id}`)}
          >
            Ver Producto
          </button>
        </div>
      </section>

      {/* ====== OFERTAS ====== */}
      <section className="offers-section">
        <h2 className="title-font offers-title">
          Ofertas / Combos
        </h2>
        <div className="offers-grid">
          {offers.map(product => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="offer-image"
                style={{ "height": "400px", "width": "500px" }}
              />
              <h4>{product.name}</h4>
              <p>${product.price.toLocaleString("es-CL")}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;