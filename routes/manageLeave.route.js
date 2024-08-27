import express from "express";
import { DeleteLeave, SaveLeave, UpdatedLeave, ViewLeave, ViewLeaveById, ViewLeaveByUser } from "../controller/manageLeave.controller.js";

const router = express.Router();

router.post("/save-leave", SaveLeave)
router.get("/view-leave", ViewLeave)
router.get("/view-leave-user/:id", ViewLeaveByUser)
router.get("/view-leave-by-id/:id", ViewLeaveById)
router.put("/update-leave/:id", UpdatedLeave)
router.delete("/delete-leave/:id", DeleteLeave)

export default router;