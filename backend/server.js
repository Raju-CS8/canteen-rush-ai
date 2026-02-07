const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const orderRoutes = require("./routes/orderRoutes");
const { initDB } = require("./db/database");
const { initSocket } = require("./services/socketService");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

initSocket(io);
initDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Canteen Rush AI Backend Running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
