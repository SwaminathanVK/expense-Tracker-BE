import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import  { Types, isValidObjectId } from "mongoose";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last60daysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60daysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const last30daysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30daysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const lastTransaction = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      totalBalance:
        (totalIncomeAgg[0]?.total || 0) - (totalExpenseAgg[0]?.total || 0),
      totalIncome: totalIncomeAgg[0]?.total || 0,
      totalExpense: totalExpenseAgg[0]?.total || 0,
      last30daysExpense: {
        total: expenseLast30Days,
        transactions: last30daysExpenseTransactions,
      },
      last60daysIncome: {
        total: incomeLast60Days,
        transactions: last60daysIncomeTransactions,
      },
      recentTransactions: lastTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
