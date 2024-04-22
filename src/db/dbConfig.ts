import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected 😊✅");
    });
    connection.on("error", (error) => {
      console.log("MongoDB Connection Error. 😥❌", error);
      process.exit();
    });
  } catch (error) {
    console.log("Some error occurred while connecting to the database. 😥");
    console.log(error);
  }
}
