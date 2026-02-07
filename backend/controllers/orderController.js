const { createOrder, updateStatus, getOrder, getAll } = require("../models/orderModel");
const { calculateETA } = require("../services/etaService");
const { notifyUpdate } = require("../services/socketService");

exports.placeOrder = (req, res) => {
  const items = req.body.items;

  const eta = calculateETA(items);

  createOrder(items, eta, (err, id) => {
    res.json({ id, eta });
  });
};

exports.markReady = (req, res) => {
  const id = req.params.id;

  updateStatus(id, "Ready", () => {
    getOrder(id, (err, order) => {
      notifyUpdate(order);
      res.json({ success: true });
    });
  });
};

exports.getOrders = (req, res) => {
  getAll((err, rows) => {
    res.json(rows);
  });
};

exports.getSingle = (req, res) => {
  getOrder(req.params.id, (err, row) => {
    res.json(row);
  });
};
