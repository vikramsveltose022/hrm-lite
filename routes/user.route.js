import express from "express"
import { DeleteUserDetail, SaveUserDetails, UpdateUserDetail, UserLogin, ViewUserDetailById, ViewUserDetails, forgetPassword, otpVerify, updatePassword } from "../controller/user.controller.js";

const router = express.Router();

router.post("/save-user", SaveUserDetails);
router.get("/view-user", ViewUserDetails)
router.get("/view-user-by-id/:id", ViewUserDetailById)
router.delete("/delete-user/:id", DeleteUserDetail)
router.put("/update-user/:id", UpdateUserDetail)
router.post("/user-login", UserLogin)   
router.post("/forget-password",forgetPassword)
router.post("/otp-verify",otpVerify)
router.post("/password-update",updatePassword)

export default router;