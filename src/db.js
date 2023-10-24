import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env);
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("connection error:", error);
  }
};

export default connectDB;
