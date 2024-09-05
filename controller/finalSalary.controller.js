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
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayOfPreviousMonth = new Date(currentYear, currentMonth - 1, 1);
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfmonths = new Date(currentYear, currentMonth, 0).getDate();
    let salaryMonth = `${currentMonth
      .toString()
      .padStart(2, "0")}-${currentYear}`;
    const users = await newSalary.find({ salaryMonth: salaryMonth });
    for (let user of users) {
      if (user.currentSalary > 0) {
        let finalAmount = 0;
        let advanceAmount = 0;
        let emiAmount;
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

        const pfAmount = (basicSalary * pf) / 100 || 0;
        const esicAmount = (basicSalary * esic) / 100 || 0;
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
          (
            currentMonthSalary -
            advanceAmount -
            emiAmount -
            pfAmount -
            esicAmount
          ).toFixed(2)
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
        let latestSalary = {
          userId: user.userId,
          employeeId: user.employeeId,
          salaryMonth: `${currentMonth
            .toString()
            .padStart(2, "0")}-${currentYear}`,
          netSalary: finalAmount,
          emi: emiAmount,
          epfoAmount: pfAmount,
          esicAmount: esicAmount,
          AdvanceSalaryAmount: advanceAmount,
          holidayAmount: holidaysAmount,
          month: currentMonth,
          totalSalary: currentMonthSalary,
        };
        // list.push(latestSalary);
        await FinalSalary.create(latestSalary);
      } else {
        let absentSalary = {
          userId: user.userId,
          employeeId: user.employeeId,
          salaryMonth: `${currentMonth
            .toString()
            .padStart(2, "0")}-${currentYear}`,
          netSalary: 0,
          emi: 0,
          epfoAmount: 0,
          esicAmount: 0,
          AdvanceSalaryAmount: 0,
          holidayAmount: 0,
          month: currentMonth,
        };
        // list.push(absentSalary);
        await FinalSalary.create(absentSalary);
      }
      // list.push(latestSalary);
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
    const salaryMonth = date.slice(3, 10);
    let LoanEmployee = await Grantloan.find({
      employee_name: employeeId,
      period: { $gt: 0 },
    });
    if (LoanEmployee == null || LoanEmployee.length == 0) {
      LoanEmployee = 0;
    }
    const employee = await FinalSalary.findOne({
      employeeId: employeeId,
      salaryMonth: salaryMonth,
    });

    list = {
      FinalSalary: employee,
      LoanAmount: LoanEmployee,
    };
    res.status(200).json({ list, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};
