import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    ShopImage: {
        type: String
    },
    Name: {
        type: String
    },
    ShopName: {
        type: String
    },
    Address: {
        type: String
    },
    State: {
        type: String
    },
    City: {
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
    GstNo: {
        type: String
    },
    Pincode: {
        type: String
    },
    status: {
        type: String,
        default: "Active"
    }

}, { timestamps: true });

export const Customer = mongoose.model("customer", CustomerSchema);
