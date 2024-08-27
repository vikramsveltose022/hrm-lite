import dotenv from "dotenv"
import { Customer } from "../model/customer.model.js";
import Jwt from "jsonwebtoken";
import { ForgetPasswordMail } from "../service/sendmail.js";
dotenv.config()

export const saveCustomerDetails = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.ShopImage = req.file.filename;
        }
        const customer = await Customer.create(req.body)
        return customer ? res.status(200).json({ message: "Customer Details Saved Successfull", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const viewCustomerDetail = async (req, res, next) => {
    try {
        const customer = await Customer.find({ status: "Active" }).sort({ sortorder: -1 })
        return (customer.length > 0) ? res.status(200).json({ Customer: customer, status: true }) : res.status(404).json({ message: "Customer Not Found", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const viewCustomerDetailById = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id)
        return customer ? res.status(200).json({ Customer: customer, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const deleteCustomerDetail = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found", status: false })
        }
        customer.status = "Deactive"
        await customer.save();
        return res.status(200).json({ message: "Customer Delete Successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const updatedCustomerDetail = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.ShopImage = req.file.filename;
        }
        const customer = await Customer.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found", status: false })
        }
        const updatedData = req.body;
        await Customer.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "Customer Detail Updated Successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const CustomerLogin = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;
        let existingAccount = await Customer.findOne({ Email })
        if (!existingAccount) {
            return res.status(400).json({ message: "Incorrect email", status: false });
        }
        if (existingAccount && existingAccount.Password !== Password) {
            return res.status(400).json({ message: "Incorrect password", status: false });
        }
        const token = Jwt.sign({ subject: Email }, process.env.TOKEN_SECRET_KEY);
        if (existingAccount) {
            // await User.updateOne({ email }, { $set: { latitude, longitude, currentAddress } });
            return res.json({ message: "Login successful", Customer: { ...existingAccount.toObject(), Password: undefined, token }, status: true, });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
};
export const ForgetPassword = async (req, res, next) => {
    try {
        const { Email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const customer = await Customer.findOne({ Email });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found", status: false });
        }
        customer.otp = otp;
        await ForgetPasswordMail(customer, otp)
        await customer.save()
        return res.status(200).json({ message: "Password Rest Successfull!", Customer: customer, status: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server error", status: false });
    }
};
export const OtpVerify = async (req, res, next) => {
    try {
        const { otp, Email } = req.body;
        const customer = await Customer.findOne({ Email: Email });
        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found", status: false });
        }
        if (otp == customer.otp) {
            return res.status(200).json({ Customer: customer, message: "otp matched successfully", status: true });
        } else {
            return res.status(400).json({ error: "Invalid otp", status: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error...", status: false });
    }
};
export const UpdatePassword = async (req, res, next) => {
    try {
        if (!req.body.Password) {
            return res.status(400).json({ error: "Passwords Required", status: false });
        } else {
            const userUpdate = await Customer.updateOne({ Email: req.body.Email }, { Password: req.body.Password });
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