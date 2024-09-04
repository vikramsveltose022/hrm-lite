import mongoose from "mongoose";
const grantloanschema = new mongoose.Schema(
  {
    employee_name: {
      type: String,
    },
    period: {
      type: Number,
    },
    loan_amount: {
      type: Number,
    },
    interest_rate: {
      type: Number,
    },
    emi: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    date: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);
export const Grantloan = mongoose.model("grantloan", grantloanschema);
