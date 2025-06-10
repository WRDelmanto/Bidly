import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    highestBid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    }
}, { timestamps: true });

const Auction = mongoose.model('Auction', auctionSchema);
export default Auction;
