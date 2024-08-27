import { Holiday } from "../model/holiday.model.js";

export const SaveHoliday = async (req, res, next) => {
    try {
        const holiday = await Holiday.create(req.body)
        return holiday ? res.status(200).json({ message: "Holiday Saved Successfull!", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const SaveHolidaymultiple1 = async (req, res, next) => {
    try {
        let Holidayss = [];
        const existingHoliday = []
        for (const item of req.body.Holidays) {
            const holi = await Holiday.findOne({ userId: item.userId, Year: item.Year, Month: item.Month, Day: item.Day })
            if (holi) {
                existingHoliday.push(holi)
                continue;
            }
            const holiday = await Holiday.create(item)
            await Holidayss.push(holiday)
        }
        return (Holidayss.length > 0) ? res.status(200).json({ message: "Holiday Saved Successfull!", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const SaveHolidaymultiple = async (req, res, next) => {
    try {
        let savedHolidays = [];
        let existingHolidays = [];
        for (const item of req.body.Holidays) {
            const existingHoliday = await Holiday.findOne({ userId: item.userId, Year: item.Year, Month: item.Month, Day: item.Day });
            if (existingHoliday) {
                existingHolidays.push(existingHoliday);
                continue;
            }
            const holiday = new Holiday(item);
            await holiday.save();
            savedHolidays.push(holiday);
        }
        if (savedHolidays.length > 0) {
            return res.status(200).json({ message: "Holidays saved successfully!", status: true, savedHolidays });
        } else {
            const message = existingHolidays.length > 0 ? "All holidays already exist." : "Something went wrong.";
            return res.status(400).json({ message, status: false, existingHolidays });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
};
export const ViewHoliday = async (req, res, next) => {
    try {
        const holiday = await Holiday.find({ status: "Active" }).sort({ sortorder: -1 })
        return (holiday.length > 0) ? res.status(200).json({ Holiday: holiday, status: true }) : res.status(404).json({ message: "Holiday Not Found", status: false })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewHolidayByUser = async (req, res, next) => {
    try {
        const holiday = await Holiday.find({ status: "Active", userId: req.params.id }).sort({ sortorder: -1 })
        return (holiday.length > 0) ? res.status(200).json({ Holiday: holiday, status: true }) : res.status(404).json({ message: "Holiday Not Found", status: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewHolidayById = async (req, res, next) => {
    try {
        const holiday = await Holiday.findById(req.params.id)
        return holiday ? res.status(200).json({ Holiday: holiday, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const DeleteHoliday = async (req, res, next) => {
    try {
        const holiday = await Holiday.findByIdAndDelete(req.params.id)
        if (!holiday) {
            return res.status(404).json({ message: "Holiday Not Found", status: false })
        }
        return res.status(200).json({ message: "Holiday Deleted Successfull!", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UpdatedHoliday = async (req, res, next) => {
    try {
        const holiday = await Holiday.findById(req.params.id)
        if (!holiday) {
            return res.status(404).json({ message: "Holiday Not Found", status: false })
        }
        const updatedData = req.body;
        await Holiday.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "updated successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}