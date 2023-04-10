// ------------------------------ Imports ------------------------------

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./api/endpoints/users.js";
import gamesRouter from "./api/endpoints/games.js";
import {
  genericErrorHandler,
  notFoundHandler,
  badRequestHandler,
  unauthorizedHandler,
  forbiddenErrorHandler
} from "./auth/errorHandlers.js";

// ------------------------------ Server ------------------------------

dotenv.config();
const server = express();

// ------------------------------ MiddleWares ------------------------------

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};

server.use(cors(corsOptions));
server.use(express.json());

// ------------------------------ Routes ------------------------------

server.use("/users", usersRouter);
server.use("/games", gamesRouter);

// ------------------------------ Error Handlers ------------------------------

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(forbiddenErrorHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

export default server;
