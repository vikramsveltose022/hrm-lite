import express from "express";
import path from "path"
import multer from "multer";
import { DeleteShiftDetail, SaveShiftDetails, UpdateShiftDetail, ViewShiftById, ViewShiftByUserId, ViewShiftDetail } from "../controller/shift.controller.js";

const router = express.Router();
// const upload = multer({ dest: "public/Images/" })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});
const upload = multer({ storage: storage });

router.post("/save-shift", SaveShiftDetails);
router.get("/view-shift", ViewShiftDetail)
router.get("/view-shift-by-id/:id", ViewShiftById)
router.delete("/delete-shift/:id", DeleteShiftDetail)
router.put("/update-shift/:id", UpdateShiftDetail)
router.get("/view-shift-by-user/:id", ViewShiftByUserId)

export default router;