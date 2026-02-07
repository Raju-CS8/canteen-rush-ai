const { getDB } = require("../db/database");

function createOrder(items, eta, callback) {
  const db = getDB();

  db.run(
    "INSERT INTO orders (items, status, createdAt, eta) VALUES (?, ?, ?, ?)",
    [JSON.stringify(items), "Pending", new Date().toISOString(), eta],
    function (err) {
      callback(err, this.lastID);
    }
  );
}

function updateStatus(id, status, callback) {
  const db = getDB();

  db.run(
    "UPDATE orders SET status=? WHERE id=?",
    [status, id],
    callback
  );
}

function getOrder(id, callback) {
  const db = getDB();

  db.get("SELECT * FROM orders WHERE id=?", [id], callback);
}

function getAll(callback) {
  const db = getDB();

  db.all("SELECT * FROM orders", [], callback);
}

module.exports = {
  createOrder,
  updateStatus,
  getOrder,
  getAll
};
