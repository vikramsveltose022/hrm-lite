import mongoose from "mongoose";
const advanceSalarySchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    amount: {
      type: Number,
    },
    date: {
      type: String,
    },
    issueDate: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);
export const AdvanceSalary = mongoose.model(
  "advanceSalary",
  advanceSalarySchema
);
