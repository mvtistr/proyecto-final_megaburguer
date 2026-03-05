import { useState } from "react";
import { Icons } from "@shared/icons.js";
import "@styles/home.css";

function Home() {

  const images = [
    "/src/assets/img/banner1.jpg",
    "/src/assets/img/banner2.jpg",
    "/src/assets/img/banner3.jpg"
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="home-container">

      {/* ====== BANNER DESTACADO ====== */}
      <section className="hero-section">

        <button className="arrow left" onClick={prevSlide}>
          <Icons.ArrowLeft size={28} />
        </button>

        <img
          src={images[current]}
          alt="Producto Destacado"
          className="hero-image"
        />

        <button className="arrow right" onClick={nextSlide}>
          <Icons.ArrowRight size={28} />
        </button>

        <div className="hero-content">
          <h2 className="title-font">Producto Destacado</h2>
          <button className="shop-btn">Shop Now</button>
        </div>

      </section>

      {/* ====== OFERTAS ====== */}
      <section className="offers-section">

        <h2 className="title-font offers-title">
          Ofertas / Combos
        </h2>

        <div className="offers-grid">

          {[1,2,3,4].map((item) => (
            <div key={item} className="product-card">
              <div className="product-img-placeholder"></div>
              <h4>Combo Mega #{item}</h4>
              <p>$5.990</p>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;