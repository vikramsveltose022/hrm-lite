import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    Employee: {
        type: String
    },
    LeaveType: {
        type: String
    },
    StartDate: {
        type: Date
    },
    EndDate: {
        type: Date
    },
    LeaveReason: {
        type: String
    },
    CheckStatus: {
        type: String
    },
    TotalDays: {
        type: Number
    },
    status: {
        type: String,
        default: "Active"
    }
}, { timestamps: true })

export const LeaveManage = mongoose.model("leaveManage", LeaveSchema)