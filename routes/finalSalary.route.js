import express from "express";
import {
  TillPaidSalary,
  finalAmount,
  viewAmount,
  viewAmountDetails,
  viewByEmployee,
} from "../controller/finalSalary.controller.js";
const router = express.Router();

router.get("/add-salary", finalAmount);
router.get("/view-salary/:employeeId/:salaryMonth", viewAmount);
router.get("/view-details/:employeeId/:date", viewAmountDetails);
router.get("/view-salary-by-employee/:employeeId", viewByEmployee);
router.get("/tillPaidSalary", TillPaidSalary);
export default router;
