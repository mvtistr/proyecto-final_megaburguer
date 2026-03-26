import { useState, useEffect } from "react";
import { deleteProduct, updateProduct } from "@services/product.service";

import api from "@services/api.js";

import toast from "react-hot-toast";

import 'bootstrap/dist/css/bootstrap.min.css';

function AdminView() {
    const [orders, setOrders] = useState([]);
    const [details, setDetails] = useState([]);
    const [viewingId, setViewingId] = useState(null);
    const [filter, setFilter] = useState("todos");
    const [loadingId, setLoadingId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get('/orders', {
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
            const res = await api.get(`/orders/${orderId}/details`);
            setDetails(res.data);
            setViewingId(orderId);
        } catch (error) {
            console.error("Error loading order details:", error);
        }
    };

    const changeStatus = async (order) => {
        try {
            setLoadingId(order.id);
            const newStatus =
                order.status === "en pedido"
                    ? "en preparacion"
                    : order.status === "en preparacion"
                        ? "listo"
                        : "entregado";
            await api.put(`/orders/${order.id}`, {
                ...order,
                status: newStatus
            });
            const updatedOrders = orders.map(o =>
                o.id === order.id ? { ...o, status: newStatus } : o
            );
            setOrders(updatedOrders);
            toast.success("Estado actualizado");
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Error al actualizar estado");
        } finally {
            setLoadingId(null);
        }
    };

    const deleteOrder = async (orderId) => {
        toast((t) => (
            <div>
                <p>¿Eliminar esta orden?</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                            try {
                                setLoadingId(orderId);
                                const token = localStorage.getItem("token");
                                await api.delete(`/orders/${orderId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                });
                                setOrders(orders.filter(o => o.id !== orderId));
                                toast.success("Orden eliminada");
                            } catch (error) {
                                console.error(error);
                                toast.error("Error al eliminar");
                            } finally {
                                setLoadingId(null);
                            }
                            toast.dismiss(t.id);
                        }}
                    >
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        ));
    };

    const filteredOrders = orders.filter(order => {
        if (filter === "todos") return true;
        return order.status === filter;
    });

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Panel administrativo</h2>
            <div className="mb-3">
                <select
                    className="form-select w-auto"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="todos">Todos</option>
                    <option value="en pedido">En Pedido</option>
                    <option value="en preparacion">En Preparacion</option>
                    <option value="listo">Listo</option>
                    <option value="entregado">Entregado</option>
                </select>
            </div>
            <p className="mb-2">
                {filteredOrders.length} pedidos encontrados
            </p>
            <table className="table table-striped shadow">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email usuario</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                No hay pedidos para este filtro 🍔
                            </td>
                        </tr>
                    ) : (
                        filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.email}</td>
                                <td>{order.order_date}</td>
                                <td>${order.total_price}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => viewDetails(order.id)}
                                    >
                                        Detalles
                                    </button>

                                    <button
                                        className="btn btn-success btn-sm ms-2"
                                        onClick={() => changeStatus(order)}
                                        disabled={order.status === "entregado" || loadingId === order.id}
                                    >
                                        {loadingId === order.id ? "Actualizando..." : "Siguiente Estado"}
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => deleteOrder(order.id)}
                                        disabled={loadingId === order.id}
                                    >
                                        {loadingId === order.id ? "Eliminando..." : "Eliminar"}
                                    </button>

                                </td>
                            </tr>
                        ))
                    )}
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