import express from "express";
import {
  ViewEpfo,
  addEpfo,
  deleteEpfo,
  updateEpfo,
  viewByIdEpfo,
} from "../controller/epfo.controller.js";
const router = express.Router();
router.post("/add-pf", addEpfo);
router.get("/view-pf", ViewEpfo);
router.get("/view-by-id-pf/:id", viewByIdEpfo);
router.put("/update-pf/:id", updateEpfo);
router.delete("/delete-pf/:id", deleteEpfo);

export default router;
