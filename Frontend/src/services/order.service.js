import API from "./api";

export const getOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await API.get('/orders', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

export const getOrderById = async (id) => {
    const token = localStorage.getItem("token");
    const res = await API.get(`/orders/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

export const createOrder = async (orderData) => {
    const token = localStorage.getItem("token");
    const res = await API.post('/orders', orderData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

export const updateOrder = async (id, orderData) => {
    const token = localStorage.getItem("token");
    const res = await API.put(`/orders/${id}`, orderData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

export const deleteOrder = async (id) => {
    const token = localStorage.getItem("token");
    const res = await API.delete(`/orders/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

export const getOrderDetails = async (id) => {
    const token = localStorage.getItem("token");
    const res = await API.get(`/orders/${id}/details`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

export const orderService = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderDetails
};