import mongoose from "mongoose";

const { Schema } = mongoose;

const bidSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    auction: {
        type: Schema.Types.ObjectId,
        ref: "Auction",
        required: true
    },
    bidder: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Bid = mongoose.model("Bid", bidSchema);
export default Bid;
