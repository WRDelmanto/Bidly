import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import Auction from "../models/auction.js";
import Bid from "../models/bid.js";

dotenv.config();

const clearAllData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // await Bid.deleteMany({});
        // console.log("Bid collections cleared successfully.");

        // await Auction.deleteMany({});
        // console.log("Auction collections cleared successfully.");

        // await User.deleteMany({});
        // console.log("User collections cleared successfully.");
    } catch (error) {
        console.error("Error clearing data:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

clearAllData();