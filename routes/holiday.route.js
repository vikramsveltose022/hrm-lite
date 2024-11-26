import express from "express";
import {
  DeleteHoliday,
  SaveHoliday,
  SaveHolidaymultiple,
  UpdatedHoliday,
  ViewHoliday,
  ViewHolidayById,
  ViewHolidayByUser,
  getHolidaysAndSundays,
} from "../controller/holiday.controller.js";

const router = express.Router();

router.post("/save-holiday", SaveHoliday);
router.post("/save-holiday-multipe", SaveHolidaymultiple);
router.get("/view-holiday", ViewHoliday);
router.get("/view-holiday-user/:id", ViewHolidayByUser);
router.get("/view-holiday-by-id/:id", ViewHolidayById);
router.put("/update-holiday/:id", UpdatedHoliday);
router.delete("/delete-holiday/:id", DeleteHoliday);
// router.get("/Add-holidays/:year", getHolidaysAndSundays);
export default router;
