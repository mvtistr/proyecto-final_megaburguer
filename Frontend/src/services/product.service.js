import api from "./api.js";
import { errors, handleError } from "./errors.js";

export const getProducts = async () => {
    try {
        const res = await api.get("/products");
        if (!res.data) {
            throw new Error(errors.empty);
        }
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProductById = async (id) => {
    try {
        const res = await api.get(`/products/${id}`);
        if(!res.data){
            throw new Error(errors.not_found);
        }
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const createProduct = async (data) => {
    try {
        const res = await api.post("/products", data);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteProduct = async (id) => {
    try{
        const res = await api.delete(`/products/${id}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateProduct = async (id, data) => {
    try {
        const res = await api.put(`/products/${id}`, data);
        if(!res.data){
            throw new Error(errors.empty);
        }
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const productService = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};