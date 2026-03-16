import { useState, useEffect } from "react";

import { getOrders } from "@services/order.service";
import API from "@services/api.js";

import 'bootstrap/dist/css/bootstrap.min.css';

function AdminView() {
    const [orders, setOrders] = useState([]);
    const [details, setDetails] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(()=> {
         const loadOrders =  async() =>{
        try {
            const data = await fetchOrders();
            setOrders(data);
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    };
    loadOrders();
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
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.cliente || "Invitado"}</td>
                            <td>${order.total_price.toLocaleString("es-CL")}</td>
                            <td>
                                <span className="badge bg-secondary">
                                    {order.status}
                                </span>
                            </td>
                            <td>{new Date(order.order_date).toLocaleString()}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => viewDetails(order.id)}
                                >
                                    Ver detalles
                                </button>
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => changeStatus(order)}
                                >
                                    Cambiar estado
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* detalle pedido */}
            {selectedOrder && (
                <div className="mt-5">
                <h4>Detalles del pedido #{selectedOrder}</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price.toLocaleString("es-CL")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
}

export default AdminView;