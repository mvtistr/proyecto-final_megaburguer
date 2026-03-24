const orderModel = require('../models/order.model.js');

const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.getOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    try{
        const order = await orderModel.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const updated = await orderModel.updateOrder(req.params.id, req.body.status);
        if (!updated) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({error: "No autorizado"});
        }
        const {id} = req.params; 
        const deleted = await orderModel.deleteOrder(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        res.json(deleted);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const details = await orderModel.getOrderDetails(req.params.id);
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderDetails
};