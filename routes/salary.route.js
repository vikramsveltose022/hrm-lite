import express from "express"
import { CreateSalary, ViewSalary } from "../controller/salary.controller.js";

const router = express.Router();

router.get("/save-salary/:userId", CreateSalary)
router.get("/view-salary/:userId", ViewSalary)

export default router;