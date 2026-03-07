import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CartContext } from "@context/CartContext";

import products from "@data/products";

import "@styles/product.css";

import { Icons } from "@shared/icons.js";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const product = products.find(p => p.id === id);
  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-container">

      {/* Imagen */}
      <div className="product-image-section">
        <img
          src={product.image}
          alt={product.name}
          className="main-image"
        />
        {/* <button className="back-btn" onClick={() => navigate(-1)}>Atrás</button> */}
      </div>

      {/* Información */}
      <div className="product-info-section">
        <h2 className="title-font">{product.name}</h2>
        <h3 className="product-price">
          ${product.price.toLocaleString("es-CL")}
        </h3>
        <hr />
        <div className="product-details">
          <h4>Descripción</h4>
          <p>{product.description}</p>
          <h4>Ingredientes</h4>
          <ul>
            {product.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="product-buttons">
          
          <button className="back-btn" onClick={() => navigate(-1)}>
            <Icons.Back size={18} style={{ marginRight: "10px" }} />
            Atrás
          </button>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            <Icons.Cart size={18} style={{ marginRight: "10px" }} />
            Agregar al pedido
          </button>

        </div>

      </div>
    </div>
  );
}

export default Product;