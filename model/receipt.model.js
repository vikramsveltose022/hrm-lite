import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    employeeId: {
      type: String,
    },
    expenseId: {
      type: String,
    },
    type: {
      type: String,
    },
    voucherType: {
      type: String,
    },
    voucherNo: {
      type: Number,
    },
    date: {
      type: String,
    },
    paymentMode: {
      type: String,
    },
    amount: {
      type: Number,
    },
    instrumentNo: {
      type: String,
    },
    remark: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    reason: {
      type: String,
    },
    paymentDate: { type: String },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Receipt = mongoose.model("receipt", ReceiptSchema);
