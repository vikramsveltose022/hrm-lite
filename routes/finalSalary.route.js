import express from "express";
import {
  TillPaidSalary,
  allAttendanceList,
  finalAmount,
  salaryStatus,
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
router.get("/allPaidSalaryList", allAttendanceList);
router.get("/paidSalary/:employeeId/:salaryMonth", salaryStatus);
export default router;
 