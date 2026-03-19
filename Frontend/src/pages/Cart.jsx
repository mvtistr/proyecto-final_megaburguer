import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "@context/CartContext";

import { createOrder } from "@services/order.service";

import "@styles/cart.css";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const order = {
        user_id: 1, // Reemplazar con el ID del usuario autenticado
        total_price: total,
        status: "pending"
      };
      await createOrder(order);
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    }
  };


  if (cart.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2 className="title-font">Tu pedido está vacío</h2>
        <button onClick={() => navigate("/menu")} className="cart-btn">
          Ver menú
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">

      <h2 className="title-font cart-title">Tu Pedido</h2>

      <div className="cart-items">

        {cart.map((product) => (
          <div key={product.id} className="cart-item">

            <img
              src={product.image_url}
              alt={product.name}
              className="cart-item-img"
            />

            <div className="cart-item-info">
              <h3>{product.name}</h3>
              <p>${product.price.toLocaleString("es-CL")}</p>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => increaseQuantity(product.id)}>+</button>
              </div>

            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(product.id)}
            >
              Eliminar
            </button>

          </div>
        ))}

      </div>

      <div className="cart-summary">

        <h3>
          Total: ${total.toLocaleString("es-CL")}
        </h3>

        <div className="cart-buttons">

        <button className="cart-btn checkout" onClick={handleCheckout}>
          Confirmar pedido
        </button>

          <button
            className="cart-btn"
            onClick={() => navigate("/menu")}
          >
            Seguir comprando
          </button>

          <button
            className="cart-btn clear"
            onClick={clearCart}
          >
            Vaciar pedido
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;