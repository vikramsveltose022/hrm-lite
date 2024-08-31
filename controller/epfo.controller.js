import { Epfo } from "../model/epfo.model.js";

export const addEpfo = async (req, res, next) => {
  try {
    req.body.siPer = 0.75;
    const epfo = await Epfo.create(req.body);
    return epfo
      ? res.status(200).json({ message: "Data Added", epfo, status: true })
      : res
          .status(404)
          .json({ message: "Something Went Wrong", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const ViewEpfo = async (req, res, next) => {
  try {
    const epfos = await Epfo.find({}).sort({ sortorder: -1 });
    return epfos.length > 0
      ? res.status(200).json({ message: "Data Found", epfos, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const viewByIdEpfo = async (req, res, next) => {
  try {
    const epfo = await Epfo.findById(req.params.id);
    return epfo
      ? res.status(200).json({ message: "Data Found", epfo, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const updateEpfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const epfo = await Epfo.findById(id);
    if (!epfo) {
      return res.status(404).json({ message: "Not Found", status: false });
    }
    const updatedData = req.body;
    await Epfo.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Data Updated", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const deleteEpfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const epfo = await Epfo.findById(id);
    if (!epfo) {
      return res.status(404).json({ message: "Not Found", status: false });
    }
    await Epfo.findByIdAndDelete(id);
    res.status(200).json({ message: "Data Deleted", epfo, status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};
