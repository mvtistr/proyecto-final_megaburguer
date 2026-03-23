import api from "./api.js";
import { errors, handleError } from "./errors.js";

import toast from "react-hot-toast";

export const getProducts = async () => {
    try {
        const res = await api.get("/products");
        if (!res.data) {
            throw new Error(errors.empty);
        }
        return res.data;
    } catch (error) {
        handleError(error);
        throw error;
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
        throw error;
    }
};

export const createProduct = async (data) => {
    try {
        const res = await api.post("/products", data);
        toast.success("Producto creado");
        return res.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try{
        const res = await api.delete(`/products/${id}`);
        toast.success("Producto eliminado");
        return res.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const updateProduct = async (id, data) => {
    try {
        const res = await api.put(`/products/${id}`, data);
        if(!res.data){
            throw new Error(errors.empty);
        }
        toast.success("Producto actualizado");
        return res.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const productService = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};