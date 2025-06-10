import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please check your entry, no name specified"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please check your entry, no email specified"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please check your entry, no password specified"],
    },
    picture: { type: String },
    stats: {
        createdAuctions: {
            type: Number,
            default: 0
        },
        bids: {
            type: Number,
            default: 0
        },
        wonAuctions: {
            type: Number,
            default: 0
        }
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
