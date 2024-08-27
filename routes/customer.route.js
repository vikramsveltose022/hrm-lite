import express from "express"
import multer from "multer";
import path from "path"
import { CustomerLogin, ForgetPassword, OtpVerify, UpdatePassword, deleteCustomerDetail, saveCustomerDetails, updatedCustomerDetail, viewCustomerDetail, viewCustomerDetailById } from "../controller/customer.controller.js";

const router = express.Router();

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

router.post("/save-customer", upload.single("image"), saveCustomerDetails);
router.get("/view-customer", viewCustomerDetail)
router.get("/view-customer-by-id/:id", viewCustomerDetailById)
router.delete("/delete-customer/:id", deleteCustomerDetail)
router.put("/update-customer/:id", upload.single("image"), updatedCustomerDetail)
router.post("/customer-login", CustomerLogin)
router.post("/forget-password", ForgetPassword)
router.post("/otp-verify", OtpVerify)
router.post("/password-update", UpdatePassword)

export default router;