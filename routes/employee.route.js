import express from "express";
import path from "path";
import multer from "multer";
import {
  VerifyPanNo,
  ViewEmployeeDetailByUserId,
  deleteEmployeeDetail,
  saveEmployeeDetails,
  updatedEmployeeDetail,
  viewEmployeeDetail,
  viewEmployeeDetailById,
} from "../controller/employee.controller.js";

const router = express.Router();
// const upload = multer({ dest: "public/Images/" })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});
const upload = multer({ storage: storage });

router.post("/save-employee", upload.single("image"), saveEmployeeDetails);
router.get("/view-employee", viewEmployeeDetail);
router.get("/view-employee-userId/:id", ViewEmployeeDetailByUserId);
router.get("/view-employee-by-id/:id", viewEmployeeDetailById);
router.delete("/delete-employee/:id", deleteEmployeeDetail);
router.put("/update-employee/:id", updatedEmployeeDetail);
router.post("/verify-pan-no", VerifyPanNo);

export default router;
