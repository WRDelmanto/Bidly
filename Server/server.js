import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/api.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(express.static("public"));

app.use("/api", router);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit with failure
  }
};

// Call the connect function
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});