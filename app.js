import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import cron from "node-cron";
import { dbConfig } from "./db/dbConfig.js";
import EmployeeRouter from "./routes/employee.route.js";
import UserRouter from "./routes/user.route.js";
import CustomerRouter from "./routes/customer.route.js";
import ShiftRouter from "./routes/shift.route.js";
import LeaveRouter from "./routes/leave.route.js";
import ManageLeaveRouter from "./routes/manageLeave.route.js";
import HolidayRouter from "./routes/holiday.route.js";
import SalaryRouter from "./routes/salary.route.js";
import ReceiptRouter from "./routes/receipt.route.js";
import AdvcanceSalaryRouter from "./routes/advanceSalary.route.js";
import GrantloanRouter from "./routes/grantLoan.route.js";
import EpfoRouter from "./routes/epfo.route.js";
import NewSalaryRouter from "./routes/newSalary.router.js";
import FinalSalaryRouter from "./routes/finalSalary.route.js";

import { createNewSalary } from "./controller/newSalary.controller.js";
import { finalAmount } from "./controller/finalSalary.controller.js";
dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const publicPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "public"
);
app.use(express.static(publicPath));
app.use("/empoloyee", EmployeeRouter);
app.use("/user", UserRouter);
app.use("/customer", CustomerRouter);
app.use("/shift", ShiftRouter);
app.use("/leave-manage", LeaveRouter);
app.use("/leave", ManageLeaveRouter);
app.use("/holiday", HolidayRouter);
app.use("/salary", SalaryRouter);
app.use("/receipt", ReceiptRouter);
app.use("/ad-salary", AdvcanceSalaryRouter);
app.use("/grantloan", GrantloanRouter);
app.use("/epfo", EpfoRouter);
app.use("/newSalary", NewSalaryRouter);
app.use("/final-salary", FinalSalaryRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

cron.schedule("0 1 1 * *", () => {
  createNewSalary();
  finalAmount();
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUNNING ON ${process.env.PORT} PORT` || 5555);
});
