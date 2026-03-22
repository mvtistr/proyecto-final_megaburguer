import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

import toast from "react-hot-toast";

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        toast.succes(`🍔 ${product.name} agregado nuevamente al pedido 🎒`);
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`🍔 ${product.name} agregado al pedido 🎒`)
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    const confirmDelete = window.confirm("¿Eliminar producto del pedido?");
    if(!confirmDelete) return;
    const product = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));
    toast.success(`🗑 ${product?.name || "Producto"} eliminado`);
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
    const confirmClear = BsWindowSidebar.confirm("¿Vaciar pedido completo?");
    if(!confirmClear) return;
    setCart([]);
    toast.success("🧹 Pedido vaciado");
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
    </CartContext.Provider>
  );
}

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node
};