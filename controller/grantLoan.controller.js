import { Grantloan } from "../model/grantLoan.model.js";

export const addLoan = async (req, res, next) => {
  try {
    const si =
      (req.body.loan_amount * req.body.period * req.body.interest_rate) / 1200;
    req.body.emi = ((req.body.loan_amount + si) / req.body.period).toFixed(2);
    req.body.duration = req.body.period;
    const loan = await Grantloan.create(req.body);
    return loan
      ? res.status(200).json({ message: "Data Added", loan, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const viewLoan = async (req, res, next) => {
  try {
    const loan = await Grantloan.find({})
      .sort({ sortorder: -1 })
      .populate({ path: "employee_name", model: "employee" });
    return loan.length > 0
      ? res.status(200).json({ message: "Data Found", loan, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const viewByIdLoan = async (req, res, next) => {
  try {
    const loan = await Grantloan.findById(req.params.id).populate({
      path: "employee_name",
      model: "employee",
    });
    return loan
      ? res.status(200).json({ message: "Data Found", loan, status: true })
      : res.status(404).json({ message: "Data Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const updateLoan = async (req, res, next) => {
  try {
    const id = req.params.id;
    const loan = await Grantloan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Not Found", status: false });
    }
    if (req.body.loan_amount && req.body.interest_rate && req.body.period) {
      const si =
        (req.body.loan_amount * req.body.period * req.body.interest_rate) /
        1200;
      req.body.emi = ((req.body.loan_amount + si) / req.body.period).toFixed(2);
    }
    const updatedData = req.body;
    await Grantloan.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Data Updated", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

export const deleteLoan = async (req, res, next) => {
  try {
    const id = req.params.id;
    const loan = await Grantloan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Not Found", status: false });
    }
    await Grantloan.findByIdAndDelete(id);
    res.status(200).json({ message: "Data Deleted", loan, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};
