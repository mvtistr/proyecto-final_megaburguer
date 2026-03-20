import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CartContext } from "@context/CartContext";
import { useAuth } from "@context/AuthContext";
import { getProductById, updateProduct } from "@services/product.service";

import "@styles/product.css";
import { Icons } from "@shared/icons.js";

function Product() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  const isAdmin = user?.role === 'admin';

const handleToggleAdminField = (campo) => {
 
  const nuevoValor = !product[campo];
  setProduct({ ...product, [campo]: nuevoValor });
  updateProduct(id, { [campo]: nuevoValor });
};
  

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

        {/* PANEL DE ADMINISTRACIÓN: Solo visible si el usuario es admin*/}
      {isAdmin && (
        <div style={{ 
          background: "#fff3cd", 
          border: "1px solid #ffeeba", 
          padding: "15px", 
          borderRadius: "8px", 
          marginBottom: "20px" 
        }}>
          <p style={{ margin: "0 0 10px 0", color: "#856404", fontWeight: "bold" }}>Ajustes de Administrador</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
              <input 
                type="checkbox" 
                checked={!!product.is_offer} 
                onChange={() => handleToggleAdminField('is_offer')}
              /> Oferta
            </label>
            <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
              <input 
                type="checkbox" 
                checked={!!product.is_featured} 
                onChange={() => handleToggleAdminField('is_featured')}
              /> Destacado
            </label>
          </div>
        </div>
      )}
      {/* Cierre panel administrativo*/}


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

          <button className="add-cart-btn" onClick={handleAddToCart} disabled={product.stock <= 0}>
            <Icons.Cart size={18} style={{ marginRight: "10px" }} />
            {product.stock > 0 ? "Agregar al pedido" : "Agotado"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Product;