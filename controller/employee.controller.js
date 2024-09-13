import { Employee } from "../model/employee.model.js";

export const saveEmployeeDetails = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.Image = req.file.filename;
    }
    if (req.body.Shift) {
      req.body.Shift = JSON.parse(req.body.Shift);
    }
    if (!req.body.AadharNo && !req.body.PanNo) {
      return res.status(404).json({
        message: "Aadhar Number And Pan Number Are Required",
        status: false,
      });
    }
    req.body.uniqueKey = req.body.panNo;
    console.log(uniqueKey);
    const employee = await Employee.create(req.body);
    return employee
      ? res
          .status(200)
          .json({ message: "employee details saved successfull", status: true })
      : res
          .status(400)
          .json({ message: "something went wrong", status: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
export const viewEmployeeDetail = async (req, res, next) => {
  try {
    const employee = await Employee.find({ status: "Active" }).sort({
      sortorder: -1,
    });
    return employee.length > 0
      ? res.status(200).json({ Employee: employee, status: true })
      : res.status(404).json({ message: "Employee Not Found", status: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
export const ViewEmployeeDetailByUserId = async (req, res, next) => {
  try {
    const employee = await Employee.find({
      userId: req.params.id,
      status: "Active",
    }).sort({ sortorder: -1 });
    return employee.length > 0
      ? res.status(200).json({ Employee: employee, status: true })
      : res.status(404).json({ message: "Employee Not Found", status: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
export const viewEmployeeDetailById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    return employee
      ? res.status(200).json({ Employee: employee, status: true })
      : res
          .status(400)
          .json({ message: "something went wrong", status: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
export const deleteEmployeeDetail = async (req, res, next) => {
  try {
    const empoloyee = await Employee.findById(req.params.id);
    if (!empoloyee) {
      return res
        .status(404)
        .json({ message: "Employee Not Found", status: false });
    }
    empoloyee.status = "Deactive";
    await empoloyee.save();
    return res
      .status(200)
      .json({ message: "delete successfull", status: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
export const updatedEmployeeDetail = async (req, res, next) => {
  try {
    // if (req.file) {
    //     req.body.Image = req.file.filename;
    // }
    const empoloyee = await Employee.findById(req.params.id);
    if (!empoloyee) {
      return res.status(404).json({ message: "Not Found", status: false });
    }
    if (req.body.PanNo) {
      req.body.uniqueKey = req.body.panNo;
    }
    const updatedData = req.body;
    await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res
      .status(200)
      .json({ message: "updated successfull", status: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
export const VerifyPanNo = async (req, res) => {
  try {
    const { panNo } = req.body;
    if (!panNo) {
      return res
        .status(400)
        .json({ status: false, message: "PanNo Or AadharNo is required." });
    }
    // const existingFace = await User.findOne({ Pan_No: panNo});
    const existingFace = await Employee.findOne({
      $or: [{ AadharNo: panNo }, { PanNo: panNo }],
    }).populate({ path: "userId", model: "customer" });
    if (existingFace) {
      return res.status(200).json({
        status: true,
        message: "PAN card verification successful.",
        Employee: existingFace,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "PAN card not found. Verification unsuccessful.",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
};
