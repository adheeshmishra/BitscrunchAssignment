import {
  handleWebSocketRequest,
  handleWebSocketMetricsRequest,
} from "../../socketController/metricSocketController.js";
import WebSocket from "ws";
const metricSocketRouter = (wsServer) => {
  wsServer.on("connection", (ws, request) => {
    // url parts is used to segregate the url into parts to further extract the chain_id, address and endpoint
    const urlParts = request.url.split("/").filter((part) => part !== "");
    console.log(urlParts);

    if (urlParts.length >= 3 && urlParts.length <= 6) {
      const chain_id = urlParts[2];
      const address = urlParts[3];
      const endpoint = urlParts[4];

      // Check if the chain_id and address are present in the URL
      if (chain_id && address) {
        // Check if the endpoint is "metrics"
        if (endpoint === "metrics") {
          const metric = urlParts[5];
          if (metric) {
            // Handle the WebSocket request for the "metrics" endpoint
            handleWebSocketMetricsRequest(ws, {
              params: { chain_id, address, metric },
            });
            return;
          } else {
            ws.send(JSON.stringify({ error: "Missing 'metric' parameter" }));
          }
        } else if (!endpoint) {
          // Handle the WebSocket request for the general chain_id and address based query endpoint
          handleWebSocketRequest(ws, { params: { chain_id, address } });
          return;
        } else {
          ws.send(JSON.stringify({ error: "Invalid Endpoint" }));
        }
      }
    }

    // WebSocket message event listener
    ws.on("message", function message(data, isBinary) {
      // Broadcast the message to all clients except the sender
      wsServer.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
      ws.send(JSON.stringify({ message: "Hello from the server" }));
    });

    // Send a message to the client when the connection is established
    ws.send(
      JSON.stringify({ message: "Connection to the server established" })
    );
  });

  wsServer.on("error", (error) => {
    console.error("WebSocket server error:", error);
  });
};

export default metricSocketRouter;
