let ioInstance;

function initSocket(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("Client connected");
  });
}

function notifyUpdate(order) {
  ioInstance.emit("orderUpdate", order);
}

module.exports = { initSocket, notifyUpdate };
