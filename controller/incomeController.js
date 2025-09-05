import Income from "../models/Income.js";
import xlsx from "xlsx";

// ➕ Add Income
export const addIncome = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newIncome = await Income.create({
      userId: req.user._id,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📂 Get All Incomes for Logged-In User
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Income
export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    if (income.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this income" });
    }

    const { icon, source, amount, date } = req.body;

    income.icon = icon ?? income.icon;
    income.source = source ?? income.source;
    income.amount = amount ?? income.amount;
    income.date = date ? new Date(date) : income.date;

    const updatedIncome = await income.save();
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Income
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    if (income.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this income" });
    }

    await income.deleteOne();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Download Incomes as Excel
export const downloadIncomeExcel = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });

    const data = incomes.map((inc) => ({
      Source: inc.source,
      Amount: inc.amount,
      Date: inc.date ? inc.date.toISOString().split("T")[0] : "",
      Icon: inc.icon || "",
    }));

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Incomes");

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=incomes.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
