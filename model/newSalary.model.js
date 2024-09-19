import mongoose from "mongoose";
const newSalarySchema = new mongoose.Schema(
  {
    userId: { type: String },
    employeeId: {
      type: String,
    },
    employeeName: {
      type: String,
    },
    AadharNo: {
      type: String,
    },
    basicSalary: {
      type: Number,
    },
    currentSalary: {
      type: Number,
    },
    salaryMonth: {
      type: String,
    },
    totalHours: {
      type: Number,
    },
    totalPresentDays: {
      type: Number,
    },
    totolAbsentDays: {
      type: Number,
    },
    presentDays: {
      type: Number,
    },
    totalShiftWorkingHours: {
      type: Number,
    },
    status: {
      type: String,
      default: "Unpaid",
    },
  },
  { timestamps: true }
);
export const newSalary = mongoose.model("newSalary", newSalarySchema);
