import { useState, useEffect } from "react";

import API from "@services/api.js";

import 'bootstrap/dist/css/bootstrap.min.css';

function AdminView() {
    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        const fetchOrders =  async() =>{
        try {
            const token = localStorage.getItem("token");
            const res = await API.get('/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchOrders();
}, []);

const viewDetails = async (orderId) => {
    try {
        const res = await API.get(`/orders/${orderId}/details`);
        setDetails(res.data);
    } catch (error) {
        console.error("Error loading order details:", error);
    }
};

const changeStatus = async (order) => {
    try {
        const newStatus = 
        order.status === "en pedido" 
        ? "en preparacion"
        : order.status === "en preparacion"
        ? "listo"
        : "entregado";

        await API.put(`/orders/${order.id}`, {
            ...order,
            status: newStatus
        });

        const updatedOrders = orders.map(o =>
            o.id === order.id ? { ...o, status: newStatus } : o
        );
        setOrders(updatedOrders);
    } catch (error) {
        console.error("Error updating order:", error);
    }
};

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Panel administrativo</h2>

            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user_id}</td>
                            <td>${order.total_price}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminView;