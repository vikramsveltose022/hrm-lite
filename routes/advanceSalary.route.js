import express from "express";
import {
  addAdvance,
  deleteSalary,
  updateSalary,
  viewAdSalary,
  viewByIdSalary,
} from "../controller/advanceSalary.controller.js";
const router = express.Router();
router.post("/add-advance", addAdvance);
router.get("/view-advance", viewAdSalary);
router.get("/view-by-id-advance/:id", viewByIdSalary);
router.put("/update-advance/:id", updateSalary);
router.delete("/delete-advacne/:id", deleteSalary);

export default router;
