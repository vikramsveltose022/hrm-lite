import dotenv from "dotenv"
import { User } from "../model/user.model.js";
import Jwt from "jsonwebtoken";
import { ForgetPasswordMail } from "../service/sendmail.js";
dotenv.config()

export const SaveUserDetails = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.Image = req.file.filename;
        }
        const user = await User.create(req.body)
        return user ? res.status(200).json({ message: "user details saved successfull", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewUserDetails = async (req, res, next) => {
    try {
        const user = await User.find({ status: "Active" }).sort({ sortorder: -1 })
        return (user.length > 0) ? res.status(200).json({ User: user, status: true }) : res.status(404).json({ message: "Employee Not Found", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewUserDetailById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        return user ? res.status(200).json({ User: user, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const DeleteUserDetail = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "Not Found", status: false })
        }
        user.status = "Deactive"
        await user.save();
        return res.status(200).json({ message: "delete successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UpdateUserDetail = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.Image = req.file.filename;
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "Not Found", status: false })
        }
        const updatedData = req.body;
        await User.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "updated successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UserLogin = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;
        let existingAccount = await User.findOne({ Email })
        if (!existingAccount) {
            return res.status(400).json({ message: "Incorrect email", status: false });
        }
        if (existingAccount && existingAccount.Password !== Password) {
            return res.status(400).json({ message: "Incorrect password", status: false });
        }
        const token = Jwt.sign({ subject: Email }, process.env.TOKEN_SECRET_KEY);
        if (existingAccount) {
            // await User.updateOne({ email }, { $set: { latitude, longitude, currentAddress } });
            return res.json({ message: "Login successful", User: { ...existingAccount.toObject(), Password: undefined, token }, status: true, });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
};

export const forgetPassword = async (req, res, next) => {
    try {
        const { Email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: "User not found", status: false });
        }
        user.otp = otp;
        await ForgetPasswordMail(user, otp)
        await user.save()
        return res.status(200).json({ message: "Password Rest Successfull!", User: user, status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server error", status: false });
    }
};
export const otpVerify = async (req, res, next) => {
    try {
        const { otp, Email } = req.body;
        const user = await User.findOne({ Email: Email });
        if (!user) {
            return res.status(404).json({ message: "User not found", status: false });
        }
        if (otp == user.otp) {
            return res.status(200).json({ User: user, message: "otp matched successfully", status: true });
        } else {
            return res.status(400).json({ error: "Invalid otp", status: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error...", status: false });
    }
};
export const updatePassword = async (req, res, next) => {
    try {
        if (!req.body.Password) {
            return res.status(400).json({ error: "Passwords Required", status: false });
        } else {
            const userUpdate = await User.updateOne({ Email: req.body.Email }, { Password: req.body.Password });
            if ((userUpdate && userUpdate.modifiedCount > 0)) {
                return res.status(200).json({ Message: "Password Updated Successfully", status: true });
            }
            return res.status(400).json({ Message: "Password Not Updated", status: false });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: "Internal Server Error...", status: false });
    }
};