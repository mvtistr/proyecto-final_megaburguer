import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { CartContext } from "@context/CartContext";
import { useAuth } from "@context/AuthContext";

import { getProductById, updateProduct, deleteProduct , getProducts} from "@services/product.service.js";

import "@styles/product.css";
import "@styles/global.css";

import { Icons } from "@shared/icons.js";

function Product() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [offersCount, setOffersCount] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  const isAdmin = user?.role === "admin";
  
  const handleToggleOffer = async () => {
    if(!product) return;
    if(!product.is_offer && offersCount >= 4){
      toast.error("Solo puede haber un máximo de 4 productos en oferta");
      return;
    }
    try {
      const updatedProduct = { ...product, is_offer: !product.is_offer };
      console.log("FRONTEND ORIGINAL: ", updatedProduct);
      const { id: _, created_at, ...cleanProduct } = updatedProduct;
      console.log("ENVIANDO LIMPIO:", cleanProduct);
      setProduct(updatedProduct);
      await updateProduct(id, cleanProduct);
      setOffersCount(prev =>
        updatedProduct.is_offer ? prev + 1 : prev - 1
      );
      toast.success("Oferta actualizada");
    } catch (error) {
      console.error("ERROR FRONT:", error);
      console.error("RAW ERROR:", error.response);
      console.log("DATA:", error.response?.data);
      if(error.response?.data?.error){
        toast.error(error.response.data.error);
      }else{
        toast.error("No se pudo actualizar el producto");
      }
    }
  };

  const handleToggleFeatured = async () => {
    console.log("CLICK FEATURED");
    if(!product) return;
    try {
      const updatedProduct = { ...product, is_featured: !product.is_featured };
      console.log("UPDATED:", updatedProduct);
      const { id, created_at, ...cleanProduct } = updatedProduct;
      setProduct(updatedProduct);
      console.log("TIPO:", typeof cleanProduct.is_featured);
      await updateProduct(id, cleanProduct);
      toast.success("Destacado actualizado");
    }catch(error){
      //console.error(error);
      toast.error("Error al actualizar destacado");
    }
  };

  const handleToggleStock = async () => {
  if (!product) return;
  try {
    
    const nuevoStock = product.stock > 0 ? 0 : 10; 
    const updatedProduct = { ...product, stock: nuevoStock };
    
    setProduct(updatedProduct);
    await updateProduct(id, updatedProduct);
    toast.success(nuevoStock === 0 ? "Producto agotado" : "Stock restaurado");
  } catch (error) {
    toast.error("Error al actualizar stock");
  }
};
  const handleDelete = async () => {
    const confirm = window.confirm("¿Seguro que quieres eliminar este producto?");
    if(!confirm) return;
    try {
      await deleteProduct(id);
      toast.success("Producto eliminado");
      navigate("/menu");
    }catch(error){
      console.error("Error eliminando el producto");
      toast.error("No se pudo eliminar el producto");
    }
  };

  const handleEdit = async () => {
    setForm(product);
    setEditing(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try{
      const updated = await updateProduct(id, form);
      setProduct(updated);
      setEditing(false);
      toast.success("Producto actualizado");
    }catch(error){
      toast.error("Error al actualizar");
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  useEffect(() => {
    const loadProduct = async () => {
      const toastId = toast.loading("Cargando producto...");
      try {
        const data = await getProductById(id);
        if(!data) throw new Error("Producto vacío");
        setProduct(data);
        const allProducts = await getProducts();
        const count = allProducts.filter(p => p.is_offer).length;
        setOffersCount(count);



      } catch (error) {
        console.error("Error cargando el producto:", error);
        setError(true);
        toast.error("Error al cargar el producto");
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    };
    if (id) loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if(!product) return;
    addToCart(product);
  };

  if (loading){
    return (
      <div style={{ textAlign: "center", padding: "40px"}}>
        <div className="spinner-border text-warning" role="status" />
        <p>Cargando producto...</p>
      </div>
    );
  }
  if(error || !product) return <p>Error al cargar el producto</p>;
  console.log("PRODUCT:", product);
  console.log("INGREDIENTS RAW:", product.ingredients);
  const ingredientsList = product.ingredients
      ? product.ingredients.split(",").map(i => i.trim())
      : [];
  console.log("LIST:", ingredientsList);
  return (
    <div className="product-container">
      <div className="product-image-section">
        <img
          src={product.image_url}
          alt={product.name}
          className="main-image"
        />
      </div>

      <div className="product-info-section">
        {editing ? (
          <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          />
        ) : (
        <h2 className="title-font">{product.name}</h2>
        )}

        {isAdmin && (
          <div
            style={{
              background: "#fff3cd",
              border: "1px solid #ffeeba",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#856404",
                fontWeight: "bold",
              }}
            >
              Ajustes de Administrador
            </p>

            <div style={{ display: "flex", gap: "20px" }}>
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  opacity: (!product.is_offer && offersCount >= 4) ? 0.6 : 1 
                }}
              >
                <input
                  type="checkbox"
                  checked={!!product.is_offer}
                  onChange={() => handleToggleOffer}
                />
                Oferta
              </label>

              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                >
                <input
                  type="checkbox"
                  checked={!!product.is_featured}
                  onClick={() => console.log("CLICK DETECTADO")}
                  // onChange={(e) => {
                  //   e.stopPropagation();
                  //   handleToggleFeatured();
                  // }}
                  onChange={handleToggleFeatured}
                />
                Destacado
              </label>

              <label
    style={{
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    }}
  >
    <input
      type="checkbox"
      checked={product.stock <= 0} 
      onChange={handleToggleStock}
    />
    Marcar como Agotado
  </label>
            </div>
          </div>
        )}
        {editing ? (
          <input
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          />
        ) : (
          <h3 className="product-price">
            ${Number(product.price || 0).toLocaleString("es-CL")}
          </h3>
        )}

        <hr />

        <div className="product-details">
          <h4>Descripción</h4>
          {editing ? (
            <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            />
          ) : (
            <p>
              {product.description?.trim()
            ? product.description
            : "Sin descripción disponible"
          }
            </p>
          )}

          <h4>Ingredientes</h4>
          {editing ? (
            <textarea
            name="ingredients"
            value={form.ingredients || ""}
            onChange={handleChange}
            />
          ) : (
            <ul>
            {ingredientsList.length > 0 ? (
            ingredientsList.map((item, index) => (
              <li key={index}>{item}</li>
            ))
            ) : (
              <li>Sin ingredientes disponibles</li>
            )}
          </ul>
          )}
        </div>

        <div className="product-buttons">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <Icons.Back size={18} style={{ marginRight: "10px" }} />
            Atrás
          </button>

          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <Icons.Cart size={18} style={{ marginRight: "10px" }} />
            {product.stock > 0 ? "Agregar al pedido" : "Agotado"}
          </button>

          {isAdmin && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                justifyContent: "flex-end"
              }}
              >
                {!editing ? (
                  <>
                    <button
                      onClick={handleEdit}
                      title="Editar"
                      style={{
                        background: "var(--tertiary)",
                        border: "none",
                        borderRadius: "4px",
                        padding: "5px 8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                      }}
                    >
                      <Icons.Edit size={18}>Editar</Icons.Edit>
                    </button>

                    <button
                      onClick={handleDelete}
                      title="Eliminar"
                      style={{
                        background: "var(--secondary)",
                        border: "none",
                        borderRadius: "4px",
                        padding: "5px 8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                      }}
                    >
                      <Icons.Delete size={18}>Eliminar</Icons.Delete>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                    onClick={handleSave}
                    style={{
                      background: "#198754",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      cursor: "pointer"
                    }}
                    >
                      <Icons.Save size={18}>Guardar</Icons.Save>
                    </button>
                    <button
                    onClick={handleCancel}
                    style={{
                      background: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      cursor: "pointer"
                    }}
                    >
                      <Icons.Cancel size={18}>Cancelar</Icons.Cancel>
                    </button>
                  </>
                )}
              </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Product;