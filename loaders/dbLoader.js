import mongoose from "mongoose";
const mongourl = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

export default async (server) => {
  try {
    //connecting to mongodb and then starting the server
    mongoose
      .connect(mongourl, {
        dbName: "bitscrunch",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
        server.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      })

      .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
      });
  } catch (err) {
    //mongodb connection error
    throw new Error(`unable to connect to database:  ${err.message}`);
  }
};
