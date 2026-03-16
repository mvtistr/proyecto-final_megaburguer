import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CartContext } from "@context/CartContext";
import { getProductById } from "@services/product.service";

import "@styles/product.css";
import { Icons } from "@shared/icons.js";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error cargando el producto:", error);
      }
    };

    loadProduct();
  }, [id]);
  if (!product) {
    return <h2>Cargando producto...</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const ingredientsList = 
    typeof product.ingredients === "string"
      ? product.ingredients.split(",")
      : product.ingredients;

  return (
    <div className="product-container">

      {/* Imagen */}
      <div className="product-image-section">
        <img
          src={product.image_url}
          alt={product.name}
          className="main-image"
        />
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
            {ingredientsList.map((item, index) => (
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