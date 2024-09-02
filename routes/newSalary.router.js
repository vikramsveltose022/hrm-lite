import express from "express";
import {
  ViewNewSalary,
  createNewSalary,
} from "../controller/newSalary.controller.js";
const router = express.Router();
router.get("/saved-salary", createNewSalary);
router.get("/viewed-salary/:userId", ViewNewSalary);
export default router;
