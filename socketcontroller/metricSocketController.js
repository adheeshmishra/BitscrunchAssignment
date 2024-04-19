//this controller handles the request for socket endpoint
import metricModel from "../models/metricModel.js";

export const handleWebSocketMetricsRequest = async (ws, request) => {
  //extract chain_id, address and metric from the request
  const { chain_id, address, metric } = request.params;
  let chain_id_number = parseFloat(chain_id);

  try {
    console.log(typeof chain_id_number, typeof address, typeof metric);

    const queryResult = await metricModel.find({
      chain_id: chain_id_number,
      address: address,
    });
    //if no result found for the given chain_id and address
    if (!queryResult || queryResult.length === 0) {
      ws.send(
        JSON.stringify({
          error: `Resource not found for chain_id:${chain_id} and address:${address}`,
        })
      );
    } else {
      let response = {};
      switch (metric) {
        case "marketcap":
          response = { metric: metric, marketcap: queryResult[0].marketcap };
          break;
        case "assets":
          response = { metric: metric, assets: queryResult[0].assets };
          break;
        case "floorprice":
          response = { metric: metric, floorprice: queryResult[0].floorprice };
          break;
        default:
          response = { error: "Invalid metric" };
      }
      ws.send(JSON.stringify(response));
    }
  } catch (error) {
    console.error("Error handling WebSocket metrics request:", error);
    ws.send(JSON.stringify({ error: "Internal Server Error" }));
  }
};

//this controller handles the websocket request for general chain_id and address based query endpoint
export const handleWebSocketRequest = async (ws, request) => {
  //extract chain_id and address from the request
  const { chain_id, address } = request.params;

  let chain_id_number = parseFloat(chain_id);
  try {
    const queryResult = await metricModel.find({
      chain_id: chain_id_number,
      address: address,
    });
    //if no result found for the given chain_id and address
    if (!queryResult || queryResult.length === 0) {
      ws.send(
        JSON.stringify({
          error: `Resource not found for chain_id:${chain_id} and address:${address}`,
        })
      );
    } else {
      const response = {
        name: queryResult[0]?.name,
        image_url: queryResult[0]?.image_url,
        description: queryResult[0]?.description,
      };
      ws.send(JSON.stringify(response));
    }
  } catch (error) {
    console.error("Error handling WebSocket request:", error);
    ws.send(JSON.stringify({ error: "Internal Server Error" }));
  }
};
