import { Shift } from "../model/shift.model.js";

export const SaveShiftDetails = async (req, res, next) => {
    try {
        const time = await Shift.create(req.body)
        return time ? res.status(200).json({ message: "Shift Details Saved Successfull!", time, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const DeleteShiftDetail = async (req, res, next) => {
    try {
        const check = await Shift.findByIdAndDelete(req.params.id)
        if (!check) {
            return res.status(404).json({ message: "Shift Not Found", status: false })
        }
        return res.status(200).json({ message: "delete successfull", status: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UpdateShiftDetail = async (req, res, next) => {
    try {
        const check = await Shift.findById(req.params.id)
        if (!check) {
            return res.status(404).json({ message: "Not Found", status: false })
        }
        const updatedData = req.body;
        await Shift.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "updated successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewShiftDetail = async (req, res, next) => {
    try {
        const hours = await Shift.find({})
        return (hours.length > 0) ? res.status(200).json({ Shift: hours, status: true }) : res.status(404).json({ message: "Not Found", status: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewShiftById = async (req, res, next) => {
    try {
        const hours = await Shift.findById({ _id: req.params.id })
        return (hours) ? res.status(200).json({ Shift: hours, status: true }) : res.status(404).json({ message: "Not Found", status: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewShiftByUserId = async (req, res, next) => {
    try {
        const hours = await Shift.find({ userId: req.params.id })
        return (hours.length > 0) ? res.status(200).json({ Shift: hours, status: true }) : res.status(404).json({ message: "Not Found", status: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}