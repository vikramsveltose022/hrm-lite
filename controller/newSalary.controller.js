import { newSalary } from "../model/newSalary.model.js";
import { Employee } from "../model/employee.model.js";
import axios from "axios";

function timeDifference(totalHours, totalWorkingHours) {
  function convertToSeconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + (seconds || 0);
  }

  function convertToHoursAndDecimalMinutes(seconds) {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  }
  const totalHoursSeconds = convertToSeconds(totalHours);
  const totalWorkingHoursSeconds = convertToSeconds(totalWorkingHours);

  const diffInSeconds = totalWorkingHoursSeconds - totalHoursSeconds;
  const diffInHours = convertToHoursAndDecimalMinutes(diffInSeconds);

  return diffInHours;
}
export const createNewSalary = async (req, res, next) => {
  try {
    let latest = [];
    // let employee = [];
    const current = new Date();
    let month = current.getMonth();
    let year = current.getFullYear();

    if (month === 0) {
      month = 11;
      year -= 1;
    } else {
      month -= 1;
    }
    const lastDayOfPreviousMonth = new Date(year, month + 1, 0).getDate();
    const users = await Employee.find({ status: "Active" });
    if (users.length === 0) {
      return res.status(404).json({ message: "User Not Found", status: false });
    }
    for (let user of users) {
      let totalWorkingDays = " 0";
      let totalhours = "0";
      let totalUserHours = "0";
      let totalShiftWorkingHours = "0";
      let totalmonthsHours = "0";
      // console.log("user", user);
      const data = await totalWorkingHours(user._id);
      if (data) {
        totalWorkingDays = data.totalDays;
        totalhours = data.totalHours;
        totalShiftWorkingHours = data.totalWorkingHours;
      }
      // console.log("totalWorkingDays", totalWorkingDays);
      const totalshiftWorkingHours = user.Shift.totalHours;
      // console.log(user.Shift);
      const CheckSalary = user.Salary;
      // console.log("basicsalary", CheckSalary);
      const onedaySalary = (CheckSalary / lastDayOfPreviousMonth).toFixed(2);
      // console.log("onedaySalary", onedaySalary);
      const oneHoursSalary = (onedaySalary / totalshiftWorkingHours).toFixed(2);
      // console.log("totalshiftWorkingHours", totalshiftWorkingHours);
      // console.log("oneHoursSalary", oneHoursSalary);
      let userSalary = 0;
      if (typeof totalhours == "string") {
        const [hours, minutes, seconds] = totalhours.split(":").map(Number);
        totalUserHours = hours + minutes / 60 + seconds / 3600;
      }
      // console.log(totalUserHours);
      if (totalUserHours > 0) {
        // console.log("totalUserHours", totalUserHours);
        userSalary = parseFloat((oneHoursSalary * totalUserHours).toFixed(2));
      }
      const letByTime = timeDifference(totalhours, totalShiftWorkingHours);
      let monthsSalary = 0;
      if (typeof totalShiftWorkingHours == "string") {
        const [hours, minutes, seconds] = totalShiftWorkingHours
          .split(":")
          .map(Number);
        totalmonthsHours = hours + minutes / 60 + seconds / 3600;
      }
      // console.log(totalUserHours);
      if (totalmonthsHours > 0) {
        // console.log("totalUserHours", totalUserHours);
        monthsSalary = parseFloat(
          (oneHoursSalary * totalmonthsHours).toFixed(2)
        );
      }
      let letTimeSalary = (monthsSalary - userSalary).toFixed(2);

      // console.log("monthssalary", userSalary);
      // console.log(oneHoursSalary);
      let latestSalary = {
        userId: user.userId,
        employeeId: user._id,
        employeeName: user.Name,
        AadharNo: user.AadharNo,
        basicSalary: user.Salary,
        salaryMonth: `${(month + 1).toString().padStart(2, "0")}-${year}`,
        currentSalary: userSalary,
        totalHours: totalhours,
        presentDays: totalWorkingDays,
        totalShiftWorkingHours: totalShiftWorkingHours,
        letByTime: letByTime || 0,
        letTimeSalary: letTimeSalary == null ? 0 : letTimeSalary,
        totalShiftOneDayTime: totalshiftWorkingHours,
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
      `https://dms--node.rupioo.com/attendance-calculate-employeed/${data}`
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
