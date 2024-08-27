import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema({
    userId: {
        type: String
    },
    employeeName: {
        type: String
    },
    employeeId: {
        type: String
    },
    salaryMonth: {
        type: String
    },
    panCard: {
        type: String
    },
    basicSalary: {
        type: Number
    },
    totalSalary: {
        type: Number
    },
    pfAmount: {
        type: Number
    },
    totalWorkingDays: {
        type: Number
    },
    totalHours: {
        type: Number
    },
    overTimeAmount: {
        type: Number
    },
    bonusAmount: {
        type: Number
    },
    status: {
        type: String,
        default: "Active"
    }
}, { timestamps: true })

export const Salary = mongoose.model("Salary", SalarySchema)