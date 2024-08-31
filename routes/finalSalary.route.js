import express from "express";
import {
  finalAmount,
  viewAmount,
} from "../controller/finalSalary.controller.js";
const router = express.Router();

router.get("/add-salary", finalAmount);
router.get("/view-salary/:employeeId/:month", viewAmount);
export default router;
