import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    // Establish connection to MongoDB using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Log the database host on successful connection
  } catch (error) {
    console.log(`Error: ${error.message}`); // Log the error message if the connection fails
    process.exit(1); // Exit process with failure code (1) to indicate an error
  }
};
