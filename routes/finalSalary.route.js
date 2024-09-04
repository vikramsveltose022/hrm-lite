import express from "express";
import {
  finalAmount,
  viewAmount,
  viewAmountDetails,
} from "../controller/finalSalary.controller.js";
const router = express.Router();

router.get("/add-salary", finalAmount);
router.get("/view-salary/:employeeId/:salaryMonth", viewAmount);
router.get("/view-details/:employeeId/:date", viewAmountDetails);
export default router;
