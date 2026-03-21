import { useState, useEffect } from "react";

import API from "@services/api.js";

import 'bootstrap/dist/css/bootstrap.min.css';

function AdminView() {
    const [orders, setOrders] = useState([]);
    const [details, setDetails] = useState([]);
    const [viewingId, setViewingId] = useState(null);

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
        setViewingId(orderId);
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
                            <td> 
                                <button className="btn btn-info btn-sm" onClick={() => viewDetails(order.id)}>Detalles</button>
                                <button className="btn btn-success btn-sm ms-2" onClick={() => changeStatus(order)} disabled={order.status === "entregado"}>Siguiente Estado</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {viewingId && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">Detalles de la Orden #{viewingId}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setViewingId(null)}></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cant.</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>${Number(item.price).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setViewingId(null)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminView;