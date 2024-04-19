import mongoose from "mongoose";
const MetricSchema = new mongoose.Schema({
  chain_id: Number,
  address: String,
  name: String,
  marketcap: Number,
  floorprice: Number,
  assets: Number,
  image_url: String,
  description: String,
  blockchain: String,
});

export default mongoose.model("table", MetricSchema);
