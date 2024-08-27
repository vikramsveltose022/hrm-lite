import mongoose from "mongoose";
const advanceSalarySchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  amount: {
    type: Number,
  },
});
export const AdvanceSalary = mongoose.model(
  "advanceSalary",
  advanceSalarySchema
);
