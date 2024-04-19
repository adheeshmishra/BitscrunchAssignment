import "dotenv/config";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import metricSocketRouter from "./socketRoutes/v1/metricSocketRouter.js";
import loaders from "./loaders/index.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server: server });

// Connect to MongoDB and Setup Express Http Routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.use(notFoundMiddleware);
// WebSocket Routes
metricSocketRouter(wsServer);

// Initialize the app services, like the Express App instance, Database connection, Starting the SERVER etc.
await loaders(app, server);
