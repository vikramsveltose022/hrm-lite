import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    Contact: {
        type: String
    },
    otp: {
        type: Number
    },
    status: {
        type: String,
        default: "Active"
    }
}, { timestamps: true });

export const User = mongoose.model("user", UserSchema);
