import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); 
  }
};

export default dbconnect;
