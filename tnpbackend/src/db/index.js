import mongoose from "mongoose";
const connectDB = async () => {
  console.log("Connecting to MongoDB...",process.env.MONGO_URI);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );

    console.log(
      `Mongodb connected with host ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("SRC :: DB :: index.js :: mongodb connection failed ", error);
  }
};

export default connectDB;