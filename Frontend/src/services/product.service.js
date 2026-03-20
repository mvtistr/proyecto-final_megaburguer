import API from './api.js';

export const getProducts = async () => {
    try {
        const res = await API.get('/products');
        if(!res.data){
            throw new Error("EMPTY_DATA");
        }
        return res.data;
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data?.message || "API_ERROR");
        }
        throw new Error("NETWORK_ERROR");
    }
};

export const getProductById = async (id) => {
    const res = await API.get(`/products/${id}`);
    return res.data;
};

export const createProduct = async (productData) => {
    const res = await API.post('/products', productData);
    return res.data;
};

export const updateProduct = async (id, productData) => {
    const res = await API.put(`/products/${id}`, productData);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await API.delete(`/products/${id}`);
    return res.data;
};

export const productService = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};