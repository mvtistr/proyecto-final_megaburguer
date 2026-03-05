import { useContext, useEffect } from "react";
import Header from "@home/Header";
import ProductCard from "../../src/components/ProductCard";
import { MarketContext } from "../../src/context/MarketContext";
import { api } from "../../src/services/api";

function Menu() {
  const { products, setProducts, addToCart } = useContext(MarketContext);

  useEffect(() => {
    // 1) hay que intentar API (si existe)
    // 2) Si es que falla, debemos dejar fallback mock (para no bloquear el hito)
    const load = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        setProducts([
          { id: 1, title: "Producto demo", price: 3990, image: "" },
          { id: 2, title: "Otro demo", price: 4990, image: "" },
        ]);
      }
    };

    if (!products.length) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main style={{ padding: 16, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            title={p.title ?? p.nombre ?? "Sin título"}
            price={p.price ?? p.precio ?? 0}
            image={p.image ?? p.imagen ?? ""}
            onAdd={() => addToCart({ id: p.id, title: p.title ?? p.nombre, price: p.price ?? p.precio, image: p.image ?? p.imagen })}
          />
        ))}
      </main>
    </>
  );
}

export default Menu;