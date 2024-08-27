import { populate } from "dotenv";
import { LeaveManage } from "../model/manageLeave.model.js";


export const SaveLeave = async (req, res, next) => {
    try {
        const leave = await LeaveManage.create(req.body)
        return leave ? res.status(200).json({ message: "Leave Saved Successfull!", status: true }) : res.status(400).json({ message: "something went wrong", status: false })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewLeaveByUser = async (req, res, next) => {
    try {
        const leave = await LeaveManage.find({ status: "Active", userId: req.params.id }).populate({ path: "Employee", model: "employee" }).sort({ sortorder: -1 })
        return (leave.length > 0) ? res.status(200).json({ Leave: leave, status: true }) : res.status(404).json({ message: "Not Found", status: false })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewLeave = async (req, res, next) => {
    try {
        const leave = await LeaveManage.find({ status: "Active", userId: req.params.id }).populate({ path: "Employee", model: "employee" }).sort({ sortorder: -1 })
        return (leave.length > 0) ? res.status(200).json({ Leave: leave, status: true }) : res.status(404).json({ message: "Not Found", status: false })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewLeaveById = async (req, res, next) => {
    try {
        const leave = await LeaveManage.findById(req.params.id).populate({ path: "Employee", model: "employee" })
        return leave ? res.status(200).json({ Leave: leave, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const DeleteLeave = async (req, res, next) => {
    try {
        const leave = await LeaveManage.findById(req.params.id)
        if (!leave) {
            return res.status(404).json({ message: "Not Found", status: false })
        }
        leave.status = "Deactive"
        await leave.save();
        return res.status(200).json({ message: "delete successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UpdatedLeave = async (req, res, next) => {
    try {
        const leave = await LeaveManage.findById(req.params.id)
        if (!leave) {
            return res.status(404).json({ message: "Not Found", status: false })
        }
        const updatedData = req.body;
        await LeaveManage.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "updated successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}