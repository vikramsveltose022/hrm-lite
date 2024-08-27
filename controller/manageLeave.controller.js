import { Leave } from "../model/leave.model.js";

export const SaveLeave = async (req, res, next) => {
    try {
        const leave = await Leave.create(req.body)
        return leave ? res.status(200).json({ message: "Leave Saved Successfull!", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewLeaveByUser = async (req, res, next) => {
    try {
        const leave = await Leave.find({ status: "Active", userId: req.params.id }).sort({ sortorder: -1 })
        return (leave.length > 0) ? res.status(200).json({ Leave: leave, status: true }) : res.status(404).json({ message: "Leave's Not Found", status: false })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewLeave = async (req, res, next) => {
    try {
        const leave = await Leave.find({ status: "Active" }).sort({ sortorder: -1 })
        return (leave.length > 0) ? res.status(200).json({ Leave: leave, status: true }) : res.status(404).json({ message: "Leave's Not Found", status: false })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewLeaveById = async (req, res, next) => {
    try {
        const leave = await Leave.findById(req.params.id)
        return leave ? res.status(200).json({ Leave: leave, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const DeleteLeave = async (req, res, next) => {
    try {
        const leave = await Leave.findById(req.params.id)
        if (!leave) {
            return res.status(404).json({ message: "Leave Not Found", status: false })
        }
        leave.status = "Deactive"
        await leave.save();
        return res.status(200).json({ message: "deleted successfull!", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UpdatedLeave = async (req, res, next) => {
    try {
        const leave = await Leave.findById(req.params.id)
        if (!leave) {
            return res.status(404).json({ message: "Leave Not Found", status: false })
        }
        const updatedData = req.body;
        await Leave.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "updated successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}