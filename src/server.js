import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
// import { socketHandler } from "./socket/index.js";

dotenv.config();
const server = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};

server.use(cors(corsOptions));
server.use(express.json());

const httpServer = createServer(server);

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });
// socketHandler(io);

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
    httpServer.listen(port, () => {
      console.log("Server running on port", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
