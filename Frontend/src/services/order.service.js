import API from "./api";

export const getOrders = async () => {
    const res = await API.get('/orders');
    return res.data;
};

export const getOrderById = async (id) => {
    const res = await API.get(`/orders/${id}`);
    return res.data;
};

export const createOrder = async (orderData) => {
    const res = await API.post('/orders', orderData);
    return res.data;
};

export const updateOrder = async (id, orderData) => {
    const res = await API.put(`/orders/${id}`, orderData);
    return res.data;
};

export const deleteOrder = async (id) => {
    const res = await API.delete(`/orders/${id}`);
    return res.data;
};

export const orderService = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};