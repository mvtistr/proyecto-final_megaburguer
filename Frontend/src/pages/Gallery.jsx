import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Icons } from "@shared/icons.js";
import { getProducts } from "@services/product.service.js";

import toast from "react-hot-toast";

import "@styles/menu.css";

function Gallery() {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const visibleProducts = 4;

  useEffect(() => {
    const loadProducts = async () => {
      const toastId = toast.loading("Cargando menú...");
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando los productos:", error);
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    };
    loadProducts();
  }, []);

  const next = () => {
    if (startIndex + visibleProducts < products.length) {
      setStartIndex(startIndex + visibleProducts);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - visibleProducts);
    }
  };

  const visible = products.slice(startIndex, startIndex + visibleProducts);

  if (!products.length) {
    return <p className="loading">Cargando menú...</p>;
  }

  return (
    <div className="gallery-container">
      <h2 className="title-font gallery-title">Nuestro Menú</h2>

      <div className="gallery-wrapper">
        <button className="gallery-arrow" onClick={prev}>
          <Icons.ArrowLeft size={35} />
        </button>

        <div className="gallery-grid">
          {visible.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="product-img"
              />
              <h3>{product.name}</h3>
              <p className="product-price">
                ${Number(product.price).toLocaleString("es-CL")}
              </p>
            </Link>
          ))}
        </div>

        <button className="gallery-arrow" onClick={next}>
          <Icons.ArrowRight size={35} />
        </button>
      </div>
    </div>
  );
}

export default Gallery;