import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "@context/CartContext";
import { useAuth } from "@context/AuthContext";

import { createOrder } from "@services/order.service";

import toast from "react-hot-toast";

import "@styles/cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, product) => acc + Number(product.price) * product.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión para finalizar la compra");
      navigate("/login");
      return;
    }
    const toastId = toast.loading("Procesando pedido...");
    try {
      const order = {
        user_id: user.id,
        total_price: total,
        cart: cart.map((product) => ({
          product_id: product.id,
          quantity: product.quantity,
          price: Number(product.price),
        })),
      };
      await createOrder(order);
      clearCart();
    } catch (error) {
      console.error("Error al procesar pedido:", error);
      toast.error("Error al procesar pedido");
    } finally {
      toast.dismiss(toastId);
      navigate("/profile");
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
              <p>${Number(product.price).toLocaleString("es-CL")}</p>

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
        <h3>Total: ${total.toLocaleString("es-CL")}</h3>

        <div className="cart-buttons">
          <button className="cart-btn checkout" onClick={handleCheckout}>
            Finalizar compra
          </button>

          <button className="cart-btn" onClick={() => navigate("/menu")}>
            Seguir comprando
          </button>

          <button className="cart-btn clear" onClick={clearCart}>
            Vaciar pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;