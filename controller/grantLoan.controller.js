import { Grantloan } from "../model/grantLoan.model.js";

export const addLoan = async (req, res, next) => {
  try {
    const si =
      (req.body.amount * req.body.period * req.body.interest_rate) / 1200;
    req.body.emi = req.body.amount + si;
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
    const loan = await Grantloan.find({}).sort({ sortorder: -1 });
    return loan.length > 0
      ? res.status(200).json({ message: "Data Found", loan, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

// export const viewByIdLoan=async(req,res,next)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }