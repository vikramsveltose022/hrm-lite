import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    Image: {
        type: String
    },
    Name: {
        type: String
    },
    dob: {
        type: String
    },
    Address: {
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
    Designation: {
        type: String
    },
    AadharNo: {
        type: String
    },
    PanNo: {
        type: String
    },
    ReferalName: {
        type: String
    },
    ReferalContactNo: {
        type: String
    },
    Shift: {
        type: Object
    },
    Salary: {
        type: Number
    },
    status: {
        type: String,
        default: "Active"
    }

}, { timestamps: true });

export const Employee = mongoose.model("employee", employeeSchema);
