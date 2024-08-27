import express from "express";
import { addLoan, viewLoan } from "../controller/grantLoan.controller.js";
const router = express.Router();

router.post("/add-loan", addLoan);
router.get("/view-loan", viewLoan);
export default router;
