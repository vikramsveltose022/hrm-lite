import mongoose from "mongoose";
const finalSalarySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    employeeId: {
      type: String,
    },
    netSalary: {
      type: Number,
    },
    salaryMonth: {
      type: String,
    },
    emi: {
      type: Number,
    },
    epfoAmount: {
      type: Number,
    },
    esicAmount: {
      type: Number,
    },
    AdvanceSalaryAmount: {
      type: Number,
    },
    holidayAmount: {
      type: Number,
    },
    month: {
      type: String,
    },
    totalSalary: {
      type: Number,
    },
    totalWorkingHours: {
      type: String,
    },
    totalUserWorkingHours: {
      type: String,
    },
    totalWorkingDays: {
      type: Number,
    },
    presentDays: {
      type: Number,
    },
    letByTime: {
      type: String,
    },
    absentDaysSalary: {
      type: Number,
    },
    absentDays: {
      type: Number,
    },
    letTimeSalary: {
      type: Number,
    },
    status: {
      type: String,
      default: "UnPaid",
    },
  },
  { timestamps: true }
);
export const FinalSalary = mongoose.model("finalSalary", finalSalarySchema);
