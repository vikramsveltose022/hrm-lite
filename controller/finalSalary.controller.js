import { AdvanceSalary } from "../model/advanceSalary.model.js";
import { Epfo } from "../model/epfo.model.js";
import { FinalSalary } from "../model/finalSalary.model.js";
import { Grantloan } from "../model/grantLoan.model.js";
import { Holiday } from "../model/holiday.model.js";
import { newSalary } from "../model/newSalary.model.js";

export const finalAmount = async (req, res, next) => {
  try {
    let emiAmount;
    let advanceAmount = 0;
    let pf;
    let esic;
    let finalAmount = 0;
    const employeeId = req.params.employeeId;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayOfPreviousMonth = new Date(currentYear, currentMonth - 1, 1);
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfmonths = new Date(currentYear, currentMonth, 0).getDate();

    const user = await newSalary.findOne({ employeeId: employeeId });
    const currentMonthSalary = user.currentSalary;
    const basicSalary = user.basicSalary;
    let oneDaySalary = (basicSalary / lastDayOfmonths).toFixed(2);
    const advanceSalaryfind = await AdvanceSalary.find({
      fullname: employeeId,
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
      employee_name: employeeId,
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
        employee_name: employeeId,
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
      createdAt: {
        $gte: firstDayOfPreviousMonth,
        $lte: lastDayOfPreviousMonth,
      },
    });
    const holidaysAmount = parseFloat(
      (holidays.length * oneDaySalary).toFixed(2)
    );
    finalAmount = parseFloat((advancesalarylapse + holidaysAmount).toFixed(2));
    let latestSalary = {
      userId: user.userId,
      employeeId: user.employeeId,
      salaryMonth: `${currentMonth.toString().padStart(2, "0")}-${currentYear}`,
      netSalary: finalAmount,
      emi: emiAmount,
      epfoAmount: pfAmount,
      esicAmount: esicAmount,
      AdvanceSalaryAmount: advanceAmount,
      holidayAmount: holidaysAmount,
    };
    await FinalSalary.create(latestSalary);
    res.status(200).json(latestSalary);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Internal Server Error", status: false });
  }
};

export const viewAmount = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const Payslip = await FinalSalary.find({ employeeId: employeeId })
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
