import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";
import Notification from "@components/Notification";

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [notification, setNotification] = useState({ 
    show: false,
    message: "" 
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const showNotification = (message) => {
    setNotification({ show: true, message });

    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 2000);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        showNotification(`🍔 ${product.name} agregado nuevamente al pedido 🎒`);
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showNotification(`🍔 ${product.name} agregado al pedido 🎒`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    const product = cart.find(item => item.id === id);
    showNotification(`🗑 ${product?.name || "Producto"} eliminado`)

    setCart(cart.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const clearCart = () => {
    showNotification("🧹 Pedido vaciado");
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount
      }}
    >
      {children}

      <Notification
        show={notification.show}
        message={notification.message}
        />
    </CartContext.Provider>
  );
}

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node
};