const validateProduct = (product) => {
    const errors = [];
    if(!product.name || product.name.trim() === ""){
        errors.push("El nombre es obligatorio");
    }
    if(!product.price || isNaN(product.price) || product.price <=0){
        errors.push("El precio debe ser un numero mayor a 0");
    }
    if(!product.category){
        errors.push("La categoria es obligatoria");
    }
    if(product.stock !== undefined && product.stock < 0){
        errors.push("El stock no puede ser negativo");
    }
    if(product.is_featured !== undefined && typeof product.is_featured !== "boolean"){
        errors.push("is_featured debe ser booleano");
    }
    if(product.is_offer !== undefined && typeof product.is_offer !== "boolean"){
        errors.push("is_offer debe ser booleano");
    }
    return errors;
};

module.exports = {
    validateProduct
};