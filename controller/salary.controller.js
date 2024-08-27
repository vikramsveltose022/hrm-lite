import { Employee } from "../model/employee.model.js";
import { Salary } from "../model/salary.model.js";
import axios from "axios";

export const CreateSalary = async (req, res, next) => {
    try {
        let latest = [];
        let employee = [];
        let totalHours = 0;
        let totalOverTime = 0;
        let overTimeAmount = 0;
        let totalWorkingDays = 0;
        let hours;
        const current = new Date()
        const month = current.getMonth()
        const user = await Employee.find({ userId: req.params.userId, status: "Active" })
        if (user.length === 0) {
            return res.status(404).json({ message: "User Not Found", status: false })
        }
        for (let id of user) {
            const data = await totalWorkingHours(id._id)
            totalWorkingDays = await data.attendanceTotal.length;
            if (data.attendanceTotal.length > 0) {
                totalHours = data.totalMonthHours;
                totalOverTime = data.totalOverTime
            }
            const CheckSalary = id.Salary;
            let latestSalary = {
                userId: id.userId,
                employeeId: id._id,
                employeeName: id.Name,
                panCard: id.PanNo,
                basicSalary: id.Salary,
                salaryMonth: month,
                totalSalary: CheckSalary,
                totalHours: totalHours,
                DayHours: hours,
                totalWorkingDays: totalWorkingDays,
                overTimeAmount: overTimeAmount,
                employee: employee
            }
            await Salary.create(latestSalary)
            latest.push(latestSalary)
        }
        return res.send(latest)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const totalWorkingHours = async function totalWorkingHours(data) {
    try {
        const res = await axios.get(`https://dms-node.rupioo.com//attendance-calculate-employee/${data}`)
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}
export const ViewSalary = async (req, res, next) => {
    try {
        const salary = await Salary.find({ userId: req.params.userId }).sort({ sortorder: -1 }).populate({ path: "employeeId", model: "employee" })
        return (salary.length > 0) ? res.status(200).json({ Salary: salary, status: true }) : res.status(500).json(404).json({ message: "Not Found", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
