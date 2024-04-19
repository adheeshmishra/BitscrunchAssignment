import "dotenv/config";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import metricSocketRouter from "./routes/v1/metricSocketRouter.js";
import loaders from "./loaders/index.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server: server });

// Connect to MongoDB and Setup Express Http Routes
await loaders(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notFoundMiddleware);
metricSocketRouter(wsServer);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
