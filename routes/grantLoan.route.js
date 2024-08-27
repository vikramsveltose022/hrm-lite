import express from "express";
import {
  addLoan,
  deleteLoan,
  updateLoan,
  viewByIdLoan,
  viewLoan,
} from "../controller/grantLoan.controller.js";
const router = express.Router();

router.post("/add-loan", addLoan);
router.get("/view-loan", viewLoan);
router.get("/view-by-id-loan/:id", viewByIdLoan);
router.put("/update-loan/:id", updateLoan);
router.delete("/delete-loan/:id", deleteLoan);
export default router;
