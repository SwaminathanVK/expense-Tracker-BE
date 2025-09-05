import  Expense from "../models/Expense.js";
import  xlsx from "xlsx";

// ➕ Add Expense
export const addExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;

    if (!icon || !category || !amount || !date) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newExpense = await Expense.create({
      userId: req.user._id,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📂 Get All Expenses for Logged-In User
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Download Expenses as Excel
export const downloadExpenseExcel = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });

    const data = expenses.map((exp) => ({
      Icon: exp.icon,
      Category: exp.category,
      Amount: exp.amount,
      Date: exp.date ? exp.date.toISOString().split("T")[0] : "",
    }));

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this expense" });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
