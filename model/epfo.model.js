import mongoose from "mongoose";
const epfoSchema = new mongoose.Schema(
  {
    totalPfPer: {
      type: Number,
    },
    employeeFund: {
      type: Number,
    },
    pensionSchemes: {
      type: Number,
    },
  },
  { timestamps: true }
);
export const Epfo = mongoose.model("/epfo", epfoSchema);
