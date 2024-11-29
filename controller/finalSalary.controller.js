import { AdvanceSalary } from "../model/advanceSalary.model.js";
import { Epfo } from "../model/epfo.model.js";
import { FinalSalary } from "../model/finalSalary.model.js";
import { Grantloan } from "../model/grantLoan.model.js";
import { Holiday } from "../model/holiday.model.js";
import { newSalary } from "../model/newSalary.model.js";

export const finalAmount = async (req, res, next) => {
  try {
    let list = [];
    let pf;
    let esic;
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear -= 1;
    } else {
      currentMonth -= 1;
    }
    const firstDayOfPreviousMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth + 1, 0);
    const lastDayOfmonths = lastDayOfPreviousMonth.getDate();
    const salaryMonth = `${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${currentYear}`;
    const users = await newSalary.find({ salaryMonth: salaryMonth });
    for (let user of users) {
      if (user.currentSalary > 0) {
        let finalAmount = 0;
        let advanceAmount = 0;
        let emiAmount;
        const totalWorkingUserHours = user.totalHours;
        const totalWorkingShiftHours = user.totalShiftWorkingHours;
        const letByTime = user.letByTime;

        const currentMonthSalary = user.currentSalary;
        const basicSalary = user.basicSalary;
        let oneDaySalary = (basicSalary / lastDayOfmonths).toFixed(2);
        const advanceSalaryfind = await AdvanceSalary.find({
          fullname: user.employeeId,
          createdAt: {
            $gte: firstDayOfPreviousMonth,
            $lte: lastDayOfPreviousMonth,
          },
        });
        advanceSalaryfind.forEach((record) => {
          advanceAmount += record.amount || 0;
        });
        const pfAndSiper = await Epfo.find();
        pfAndSiper.forEach((record) => {
          (pf = record.totalPfPer), (esic = record.siPer);
        });

        // const pfAmount = (basicSalary * pf) / 100 || 0;
        // const esicAmount = (basicSalary * esic) / 100 || 0;
        const loanEmi = await Grantloan.find({
          employee_name: user.employeeId,
          period: { $gt: 0 },
        });
        if (loanEmi.length > 0) {
          loanEmi.forEach((record) => {
            emiAmount = record.emi || 0;
          });
        } else {
          emiAmount = 0;
        }
        await Grantloan.updateMany(
          {
            employee_name: user.employeeId,
            period: { $gt: 0 },
          },
          {
            $inc: { period: -1 },
          }
        );
        const advancesalarylapse = parseFloat(
          (currentMonthSalary - advanceAmount - emiAmount).toFixed(2)
        );
        const holidays = await Holiday.find({
          userId: user.userId,
          Year: currentYear,
          Month: currentMonth,
        });
        const holidaysAmount = parseFloat(
          (holidays.length * oneDaySalary).toFixed(2)
        );
        finalAmount = parseFloat(
          (advancesalarylapse + holidaysAmount).toFixed(2)
        );
        const totalWorkingDays = lastDayOfmonths - holidays.length;
        const presentDays = user.presentDays;
        const absentDays = totalWorkingDays - presentDays;
        const absentDaysSalary = (
          absentDays *
          (basicSalary / lastDayOfmonths)
        ).toFixed(2);
        let latestSalary = {
          userId: user.userId,
          employeeId: user.employeeId,
          salaryMonth: `${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${currentYear}`,
          netSalary: Math.round(finalAmount),
          emi: emiAmount,
          // epfoAmount: pfAmount,
          // esicAmount: esicAmount,
          AdvanceSalaryAmount: advanceAmount,
          holidayAmount: holidaysAmount,
          month: currentMonth + 1,
          totalSalary: currentMonthSalary,
          totalWorkingHours: totalWorkingShiftHours,
          totalUserWorkingHours: totalWorkingUserHours,
          totalWorkingDays: totalWorkingDays,
          presentDays: presentDays,
          absentDays: absentDays,
          letByTime: letByTime,
          letTimeSalary: user.letTimeSalary,
          absentDaysSalary: absentDaysSalary,
        };
        // list.push(latestSalary);
        await FinalSalary.create(latestSalary);
      } else {
        let absentSalary = {
          userId: user.userId,
          employeeId: user.employeeId,
          salaryMonth: `${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${currentYear}`,
          netSalary: 0,
          emi: 0,
          epfoAmount: 0,
          esicAmount: 0,
          AdvanceSalaryAmount: 0,
          holidayAmount: 0,
          month: currentMonth,
          totalWorkingDays: 0,
          totalWorkingHours: "0",
          totalUserWorkingHours: "0",
          presentDays: 0,
          absentDays: lastDayOfmonths,
          letByTime: "0",
          letTimeSalary: user.letTimeSalary,
          absentDaysSalary: 0,
        };
        // list.push(absentSalary);
        await FinalSalary.create(absentSalary);
      }
    }
    // res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Internal Server Error", status: false });
  }
};

export const viewAmount = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const salaryMonth = req.params.salaryMonth;
    const Payslip = await FinalSalary.find({
      employeeId: employeeId,
      salaryMonth: salaryMonth,
    })
      .sort({ sortorder: -1 })
      .populate({ path: "employeeId", model: "employee" });
    return Payslip.length > 0
      ? res.status(200).json({ message: "Data Found", Payslip, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const viewAmountDetails = async (req, res, next) => {
  try {
    let list = {};
    const employeeId = req.params.employeeId;
    const date = req.params.date;
    const MonthYear = date.slice(3, 10);
    // let [month, year] = MonthYear.split("-").map(Number);
    // let currentDate = new Date(year, month - 1);
    // currentDate.setMonth(currentDate.getMonth() - 1);
    // const newMonth = currentDate.getMonth() + 1;
    // const newYear = currentDate.getFullYear();
    // const formattedMonthYear = `${newMonth
    //   .toString()
    //   .padStart(2, "0")}-${newYear}`;
    let LoanEmployee = await Grantloan.findOne({
      employee_name: employeeId,
      date: MonthYear,
    });

    const employee = await FinalSalary.findOne({
      employeeId: employeeId,
      salaryMonth: MonthYear,
    });

    const advanceAmount = await AdvanceSalary.findOne({
      fullname: employeeId,
      date: MonthYear,
    });

    const loanAmount = LoanEmployee == null ? 0 : LoanEmployee.loan_amount;
    const loanStatus = LoanEmployee == null ? "" : LoanEmployee.status;
    const advanceAmt = advanceAmount == null ? 0 : advanceAmount.amount;
    const advancestatus = advanceAmount == null ? "" : advanceAmount.status;
    const finalSalary = employee == null ? 0 : employee.netSalary;
    const salaryStatus = employee == null ? "" : employee.status;
    list = {
      FinalSalary: finalSalary,
      salaryStatus: salaryStatus,
      loan_amount: loanAmount,
      loan_status: loanStatus,
      advanceSalary: advanceAmt,
      advanceAmount_status: advancestatus,
    };
    res.status(200).json({ list, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const viewByEmployee = async (req, res, next) => {
  try {
    const id = req.params.employeeId;
    const list = await FinalSalary.find({ employeeId: id })
      .sort({
        sortorder: -1,
      })
      .populate({ path: "employeeId", model: "employee" });
    return list.length > 0
      ? res.status(200).json({ message: "Data Found", list, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const TillPaidSalary = async (req, res, next) => {
  try {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear -= 1;
    } else {
      currentMonth -= 1;
    }
    let salaryMonth = `${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${currentYear}`;
    const employee = await FinalSalary.find({ salaryMonth: salaryMonth });
    const CurrentMonthPaidSalary = employee.reduce((tot, item) => {
      return (tot = tot += item.netSalary);
    }, 0);
    const totalEmployeeData = await FinalSalary.find();
    const TillPaidSalary = totalEmployeeData.reduce((tot, item) => {
      return (tot = tot += item.netSalary);
    }, 0);
    res.status(200).json({ CurrentMonthPaidSalary, TillPaidSalary });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const allAttendanceList = async (req, res, next) => {
  try {
    const attendanceList = await FinalSalary.find({})
      .sort({ sortorder: -1 })
      .populate({ path: "employeeId", model: "employee" });
    return attendanceList
      ? res
          .status(200)
          .json({ message: "Data Found", attendanceList, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};
