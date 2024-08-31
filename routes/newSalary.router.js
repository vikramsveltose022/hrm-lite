import express from "express";
import { ViewNewSalary } from "../controller/newSalary.controller.js";
const router = express.Router();

router.get("/viewed-salary/:userId", ViewNewSalary);
export default router;
