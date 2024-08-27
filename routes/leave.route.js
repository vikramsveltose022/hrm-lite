import express from "express"
import { DeleteLeave, SaveLeave, UpdatedLeave, ViewLeave, ViewLeaveById, ViewLeaveByUser } from "../controller/leave.controller.js";

const router = express.Router();

router.post("/save-manage-leave", SaveLeave)
router.get("/view-manage-leave", ViewLeave)
router.get("/view-manage-leave-user/:id", ViewLeaveByUser)
router.get("/view-manage-leave-by-id/:id", ViewLeaveById)
router.put("/update-manage-leave/:id", UpdatedLeave)
router.delete("/delete-manage-leave/:id", DeleteLeave)

export default router;