import mongoose from "mongoose";
const mongourl = process.env.MONGO_URI;

export default async () => {
  try {
    mongoose
      .connect(mongourl, {
        dbName: "bitscrunch",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
      });
  } catch (err) {
    //mongodb connection error
    throw new Error(`unable to connect to database:  ${err.message}`);
  }
};


