import toast from "react-hot-toast";
import api from "./api";
import { errors } from "./errors";

import toast from "react-hot-toast";

export const createOrder = async (orderData) => {
  try {
    const res = await api.post("/orders", orderData);
    if(!res.data){
      throw new Error(errors.empty);
    }
    toast.success("Pedido realizado con éxito 🍔");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserOrders = async () => {
  try {
    const res = await api.get("/orders/my-orders");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getOrderById = async (id) => {
  try {
    const res = await api.get(`/orders/${id}`);
    if(!res.data){
      throw new Error(errors.not_found);
    }
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const res = await api.put(`/orders/${id}`, orderData);
    toast.success("Pedido actualizado");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await api.delete(`/orders/${id}`);
    toast.success("Pedido eliminado");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getOrderDetails = async (id) => {
  try {
    const res = await api.get(`/orders/${id}/details`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const orderService = {
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderDetails,
};