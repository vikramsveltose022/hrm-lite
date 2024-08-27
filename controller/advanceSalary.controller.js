import { AdvanceSalary } from "../model/advanceSalary.model.js";

export const addAdvance = async (req, res, next) => {
  try {
    const advanceSalary = await AdvanceSalary.create(req.body);
    return advanceSalary
      ? res
          .status(200)
          .json({ message: "Data Added", advanceSalary, status: true })
      : res
          .status(404)
          .json({ message: "Something Went Wrong", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const viewAdSalary = async (req, res, next) => {
  try {
    const advanceSalary = await AdvanceSalary.find({}).sort({ sortorder: -1 });
    return advanceSalary.length > 0
      ? res
          .status(200)
          .json({ message: "Data Found", salary: advanceSalary, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const viewByIdSalary = async (req, res, next) => {
  try {
    const advanceSalary = await AdvanceSalary.findById(req.params.id);
    return advanceSalary
      ? res
          .status(200)
          .json({ message: "Data Found", advanceSalary, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const updateSalary = async (req, res, next) => {
  try {
    const id = req.params.id;
    const advanceSalary = await AdvanceSalary.findById(id);
    if (!advanceSalary) {
      return res.status(404).json({ message: "Not Found", status: false });
    }
    const updatedData = req.body;
    await AdvanceSalary.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Data Updated", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const deleteSalary = async (req, res, next) => {
  try {
    const id = req.params.id;
    const advanceSalary = await AdvanceSalary.findById(id);
    if (!advanceSalary) {
      return res.status(404).json({ message: "Not Found", status: false });
    }
    await AdvanceSalary.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Data Deleted", advanceSalary, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};
