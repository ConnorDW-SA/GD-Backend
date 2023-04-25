// ------------------------------ Imports ------------------------------

import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import server from "./server.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { newConnectionHandler } from "./socket/socket.js";

// ------------------------------ Server ------------------------------

const port = process.env.PORT || 3002;

// ------------------------------ Socket ------------------------------

const httpServer = createServer(server);
const io = new Server(httpServer);
io.on("connection", newConnectionHandler);

// ------------------------------ DB ------------------------------

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
    httpServer.listen(port, () => {
      console.log("Server running on port", port);
      console.table(listEndpoints(server));
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
