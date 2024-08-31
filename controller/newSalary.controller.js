import { newSalary } from "../model/newSalary.model.js";
import { Employee } from "../model/employee.model.js";
import axios from "axios";

export const createNewSalary = async (req, res, next) => {
  try {
    // let latest = [];
    // let employee = [];
    let totalhours = 0;
    let totalWorkingDays = 0;
    const current = new Date();
    const month = current.getMonth();
    const year = current.getFullYear();
    const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
    const users = await Employee.find({
      // userId: req.params.userId,
      // status: "Active",
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "User Not Found", status: false });
    }
    for (let user of users) {
      // console.log("users", user);
      const data = await totalWorkingHours(user._id);
      const totalshiftWorkingHours = user.Shift.totalHours;
      totalWorkingDays = await data.totalDays;
      totalhours = data.totalHours.toString();
      const CheckSalary = user.Salary;
      // console.log("basicsalary", CheckSalary);
      const onedaySalary = (CheckSalary / lastDayOfPreviousMonth).toFixed(2);
      // console.log("onedaySalary", onedaySalary);
      const oneHoursSalary = (onedaySalary / totalshiftWorkingHours).toFixed(2);
      // console.log("totalshiftWorkingHours", totalshiftWorkingHours);
      // console.log("oneHoursSalary", oneHoursSalary);
      let userSalary = 0;
      const [hours, minutes, seconds] = totalhours.split(":").map(Number);
      const totalUserHours = hours + minutes / 60 + seconds / 3600;
      // console.log(totalUserHours);
      if (totalUserHours > 0) {
        // console.log("totalUserHours", totalUserHours);
        userSalary = parseFloat((oneHoursSalary * totalUserHours).toFixed(2));
      }
      // console.log("monthssalary", userSalary);
      // console.log(oneHoursSalary);
      let latestSalary = {
        userId: user.userId,
        employeeId: user._id,
        employeeName: user.Name,
        AadharNo: user.AadharNo,
        basicSalary: user.Salary,
        salaryMonth: `${month.toString().padStart(2, "0")}-${year}`,
        currentSalary: userSalary,
        totalHours: parseFloat(totalhours),
      };
      await newSalary.create(latestSalary);
      // latest.push(latestSalary);
    }
    // return res.send(latest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const totalWorkingHours = async function totalWorkingHours(data) {
  try {
    const res = await axios.get(
      `https://dms-node.rupioo.com/attendance-calculate-employeed/${data}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const ViewNewSalary = async (req, res, next) => {
  try {
    const salary = await newSalary
      .find({ userId: req.params.userId })
      .sort({ sortorder: -1 });
    return salary.length > 0
      ? res.status(200).json({ Salary: salary, status: true })
      : res.status(500).json(404).json({ message: "Not Found", status: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
