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
  },
  { timestamps: true }
);
export const FinalSalary = mongoose.model("finalSalary", finalSalarySchema);
