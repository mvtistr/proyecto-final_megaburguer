import products from "@data/products.js";

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(products);
    }, 300);
  });
};

// Con Backend
// export const fetchProducts = async () => {
//   const res = await fetch("http://localhost:3000/products");
//   return res.json();
// };