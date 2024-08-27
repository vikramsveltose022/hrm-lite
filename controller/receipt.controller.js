import { Receipt } from "../model/receipt.model.js";

export const SaveReceipt = async (req, res, next) => {
    try {
        const partyReceipt = [];
        for (const item of req.body.Receipt) {
            const isBankPayment = item.paymentMode !== "Cash";
            const paymentMode = isBankPayment ? 'Bank' : 'Cash';
            const rece = await Receipt.find({ status: "Active", paymentMode, }).sort({ sortorder: -1 });
            if (rece.length > 0) {
                const latestReceipt = rece[rece.length - 1];
                req.body.voucherNo = latestReceipt.voucherNo + 1;
            } else {
                req.body.voucherNo = 1;
            }
            req.body.voucherType = "receipt";
            req.body.voucherDate = new Date();
            const receiptData = { ...req.body, ...item };
            const receipt = await Receipt.create(receiptData);
            await partyReceipt.push(receipt);
        }
        return (partyReceipt.length > 0) ? res.status(200).json({ message: "Receipt Saved Successfully!", status: true }) : res.status(404).json({ message: "Receipt Not Found", status: false });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const UpdateReceipt = async (req, res, next) => {
    try {
        const existingReceipt = await Receipt.findById(req.params.id);
        if (!existingReceipt) {
            return res.status(404).json({ message: "Receipt Not Found", status: false });
        }
        req.body.voucherType = "receipt";
        req.body.voucherDate = new Date();
        const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ message: "Receipt Updated Successfully!", status: true, receipt: updatedReceipt });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const ViewReceipt = async (req, res, next) => {
    try {
        const receipts = await Receipt.find({ userId: req.params.id, status: "Active", type: "receipt" }).sort({ sortorder: -1 }).populate({ path: "employeeId", model: "employee" }).populate({ path: "userId", model: "customer" })
        return (receipts.length > 0) ? res.status(200).json({ Receipts: receipts, status: true }) : res.status(404).json({ message: "Not Found", status: false });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
};
export const ViewReceiptById = async (req, res, next) => {
    try {
        let receipt = await Receipt.findById({ _id: req.params.id }).populate({ path: "employeeId", model: "employee" }).populate({ path: "userId", model: "customer" })
        return receipt ? res.status(200).json({ Receipts: receipt, status: true }) : res.status(404).json({ error: "Not Found", status: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
};
export const DeleteReceipt = async (req, res, next) => {
    try {
        const receipt = await Receipt.findById({ _id: req.params.id });
        if (!receipt) {
            return res.status(404).json({ error: "Not Found", status: false });
        }
        receipt.status = "Deactive";
        await receipt.save();
        return res.status(200).json({ message: "delete successful", status: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error", status: false });
    }
};
export const SavePayment = async (req, res, next) => {
    try {
        const partyReceipt = [];
        for (const item of req.body.Payment) {
            let query = { status: "Active" };
            let isBankPayment = item.type === "payment" && item.paymentMode !== "Cash";
            query.paymentMode = isBankPayment ? "Bank" : "Cash";
            const rece = await Receipt.find(query).sort({ sortorder: -1 });
            if (rece.length > 0) {
                const latestReceipt = rece[rece.length - 1];
                req.body.voucherNo = latestReceipt.voucherNo + 1;
            } else {
                req.body.voucherNo = 1;
            }
            req.body.voucherType = "payment";
            const receiptData = { ...req.body, ...item };
            const reciept = await Receipt.create(receiptData);
            partyReceipt.push(reciept);
        }
        return partyReceipt.length > 0 ? res.status(200).json({ message: "Payment Saved Successfully!", status: true }) : res.status(404).json({ message: "Payment Not Found", status: false });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const ViewPayment = async (req, res, next) => {
    try {
        const receipts = await Receipt.find({ userId: req.params.id, status: "Active", type: "payment" }).sort({ sortorder: -1 }).populate({ path: "employeeId", model: "employee" }).populate({ path: "userId", model: "customer" })
        return (receipts.length > 0) ? res.status(200).json({ Receipts: receipts, status: true }) : res.status(404).json({ message: "Not Found", status: false });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
};
export const UpdatePayment = async (req, res, next) => {
    try {
        const existingReceipt = await Receipt.findById(req.params.id);
        if (!existingReceipt) {
            return res.status(404).json({ message: "Payment Not Found", status: false });
        }
        req.body.voucherType = "payment";
        const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ message: "Payment Updated Successfully!", status: true, receipt: updatedReceipt });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const DeletePayment = async (req, res, next) => {
    try {
        const receipt = await Receipt.findById({ _id: req.params.id });
        if (!receipt) {
            return res.status(404).json({ message: "Payment Not Found", status: false });
        }
        receipt.status = "Deactive";
        await receipt.save();
        return res.status(200).json({ message: "Payment Delete Successfull!", status: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
};