import mongoose from "mongoose";

const HolidaySchema = new mongoose.Schema({
    userId: {
        type: String
    },
    InTime: {
        type: String
    },
    OutTime: {
        type: String
    },
    Year: {
        type: String
    },
    Month: {
        type: String
    },
    Day: {
        type: String
    },
    HolidayName: {
        type: String
    },
    status: {
        type: String,
        default: "Active"
    }
}, { timestamps: true })

export const Holiday = mongoose.model("holiday", HolidaySchema)