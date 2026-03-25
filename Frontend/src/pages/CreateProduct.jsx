import { useState} from "react";
import { createProduct } from "@services/product.service";



import 'bootstrap/dist/css/bootstrap.min.css';




function CreateProduct() {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image_url, setImage_url] = useState("");
    const [is_featured, setIs_featured] = useState(false);
    const [is_offer, setIs_offer] = useState(false);
    const [stock, setStock] = useState(false);


    const crear = async (e) => {
     e.preventDefault();
    try {
        const nuevoProducto = {
            name,
            ingredients,
            description,
            price: parseFloat(price),
            image_url,
            is_featured,
            is_offer,
            stock
        };
        
         await createProduct(nuevoProducto);
        alert("¡Producto creado con éxito!");
        
        
        setName("");
        setPrice("");
        setDescription("");
        setImage_url("");
        setIs_featured(false);
        setIs_offer(false);
        setStock(false);
        setIngredients("");
        
    } catch (error) {
        console.error("Error al crear:", error);
        alert("Hubo un error al guardar el producto.");
    }
};



    



    return (
        <div className="container-crear">
            <h2>Crear Producto</h2>
            <form onSubmit={crear} action="">
            <div>
                <div className="m-3 form-floating">
                <input
                className="form-control"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Nombre del producto</label>
                </div>
                <div className="m-3 form-floating">
                <input
                className="form-control"
                type="text"
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                />
                <label htmlFor="ingredients">Ingredientes</label>
                </div>

                <div className="m-3 form-floating">
                <input
                className="form-control"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="description">Descripcion</label>
                </div>

                <div className="m-3 form-floating">
                <input
                className="form-control"
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="price">Precio</label>
                </div>

                <div className="m-3 form-floating">
                <input
                className="form-control"
                type="text"
                id="image_url"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
                />
                <label htmlFor="image_url">Imagen</label>
                </div>

                <div className="form-check m-3">
                <input 
                className="form-check-input"
                type="checkbox" 
                id="is_featured"
                checked={is_featured}
                onChange={(e) => setIs_featured(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="is_featured">
                ¿Es producto destacado?
                </label>
                </div>

                 <div className="form-check m-3">
                <input 
                className="form-check-input"
                type="checkbox" 
                id="is_offer"
                checked={is_offer}
                onChange={(e) => setIs_offer(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="is_offer">
                Se encuentra en oferta?
                </label>
                </div>

                 <div className="form-check m-3">
                <input 
                className="form-check-input"
                type="checkbox" 
                id="stock"
                checked={stock}
                onChange={(e) => setStock(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="stock">
                Ya en Stock
                </label>
                </div>


            </div>

            <div className="m-3">
            <button type="submit" className="btn btn-primary w-100">
            Crear Producto
            </button>
            </div>


            </form>
           
        </div>
        
    )
}

export default CreateProduct;