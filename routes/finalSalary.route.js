import express from "express";
import {
  finalAmount,
  viewAmount,
} from "../controller/finalSalary.controller.js";
const router = express.Router();

router.get("/add-salary/:employeeId", finalAmount);
router.get("/view-salary/:employeeId", viewAmount);
export default router;
